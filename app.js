//require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
 const port = 4000;
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


const pool = mysql.createPool({
    
    host : 'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com',
    user : 'admin',
    password : 'NoTeDeSt^C10.6?SxwY882}',
    database : 'conqtvms_dev',
});

// app.post("",(req,res)=>{
//     pool.getConnection((err,connection)=>{
//         if(err) throw err;

//         const params = req.body;
//         connection.query("ALTER TABLE ProductV2 ADD pageSize INT, currentPage INT, orderBy ", params,(err,rows)=>{
//             connection.release();

//             if(!err){
//                 res.send("Prameters are provided");

//             }else{
//                 console.log(err);
//             }
//         })
//     })
// })



app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        //console.log("WhatHappenend");
        if(err) throw err
        
        connection.query('SELECT * FROM ProductV2', (err, rows) => {
            connection.release();
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log(' Here are the all the details\n', rows)
        })
    })
});


app.get('/',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        
        connection.query('SELECT productName,description FROM ProductV2 ', (err, rows) => {
            connection.release();
            if (!err) {
                res.status(200).json(rows)
            } else {
                console.log(err)
            }
            
            console.log(' Here are the all the details\n', rows)
        })
        
    })
})


app.listen(port,()=>{
    console.log(`Connected to port ${port}`);
})

