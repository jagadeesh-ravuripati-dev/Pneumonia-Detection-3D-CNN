from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import nibabel as nib
from scipy import ndimage
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

def read_nifti_file(filepath):
    """Read and load volume"""
    scan = nib.load(filepath)
    scan = scan.get_fdata()
    return scan

def normalize(volume):
    """Normalize the volume"""
    min_val = -1000
    max_val = 400
    volume[volume < min_val] = min_val
    volume[volume > max_val] = max_val
    volume = (volume - min_val) / (max_val - min_val)
    volume = volume.astype("float32")
    return volume

def resize_volume(img):
    """Resize across z-axis"""
    desired_depth = 64
    desired_width = 128
    desired_height = 128
    current_depth = img.shape[-1]
    current_width = img.shape[0]
    current_height = img.shape[1]
    depth = current_depth / desired_depth
    width = current_width / desired_width
    height = current_height / desired_height
    depth_factor = 1 / depth
    width_factor = 1 / width
    height_factor = 1 / height
    img = ndimage.rotate(img, 90, reshape=False)
    img = ndimage.zoom(img, (width_factor, height_factor, depth_factor), order=1)
    return img

def process_nibabel(path):
    """Read and resize volume"""
    volume = read_nifti_file(path)
    volume = normalize(volume)
    volume = resize_volume(volume)
    return volume

@app.route('/api/data', methods=['POST'])
def process_data():
    data = request.files['file']
    print(data)
    
    
    file_path = 'temp.nii.gz' # Adjust this path according to your setup
    data.save(file_path)
    try:
        prediction = test_pneumonia(file_path)
        os.remove(file_path)
        return jsonify({'prediction': round(float(prediction),3)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def test_pneumonia(file_path):
    model = load_model("3d_image_classification.h5")
    preprocessed_volume = process_nibabel(file_path)
    prediction = model.predict(np.expand_dims(preprocessed_volume, axis=0))[0]
    return prediction[0]

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
