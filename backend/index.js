import express from'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"qwerty",
    database:"docweb" 
})

app.listen(3000,()=>{
    console.log("listening..")
})

app.get("/",(req,res)=>{
    return (res.json("Hello Iam from backend"))
})

app.get("/patients",(req,res)=>{
    const sql = "select * from patient_details"
    connection.query(sql,(err,result)=>{
        if(err){
            return res.json(err)
        }
        return res.json(result)
    })
})

app.post("/patients",(req,res)=>{
    const {patient_name,patient_age,patient_results} = req.body;
    const sql = "INSERT INTO patient_details (patient_name, patient_age, patient_results) VALUES (?, ?, ?)";
    connection.query(sql, [patient_name, patient_age, patient_results], (err,result)=>{
        if(err){
            return res.json(err);
        }
        return res.json("Details inserted successfully");
    });
});

app.post("/logins",(req,res)=>{
    const {name,age,email,password} = req.body;
    const sql = "insert into signup(name,age,email,password) values(?,?,?,?)"
    connection.query(sql,[name,age,email,password],(err,result)=>{
        if(err){
            return res.json({
                "message":"unsuccess"
            })
        }
        return res.json({
            "message":"success"
        })
    })
})

app.post("/validate-login",(req,res)=>{
    const {email,password} = req.body;
    console.log(email)
    console.log(password)
    const sql = "select * from signup where email=? and password=?"
    connection.query(sql,[email,password],(err,result)=>{
        return res.json(result)
    })
})