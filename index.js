var express = require('express');
var mysql = require('mysql2');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();




app.use(cors());
app.use(bodyparser.json());



app.listen('3000',()=>{
    console.log('server is running...');
})



var db = mysql.createConnection({
    host:'localhost',   
    port: 3306,
    user: 'root',
    password: 'navin@123',
    database: 'demoproject' 
});

db.connect((err)=>{
    if(err)throw err;
    else
    {
        console.log('database connected...');
    }
});


//app.get('/api',(req,res)=>{
  //  res.send('Api is working.')
//})

// Create data
app.post('/api/USER',(req,res)=>{
     console.log(req.body);
    let sql = `INSERT INTO demoproject.user_data(First_Name, last_Name, Email_ID , Contact_Number)
               VALUES('${req.body.First_Name}','${req.body.last_Name}','${req.body.Email_ID}','${req.body.Contact_Number}')
               `; 
    db.query(sql,(err,result)=>{
            if(!err) {
            res.send(result);
            }else{
                console.log(err +"  Data Already exists");
            }
    });        


}); 


// Read data 
app.get('/api/USER/',(req,res)=>{
    let sql = `SELECT * FROM demoproject.user_data`; 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})

// Read single data 
app.get('/api/USER/:User_ID',(req,res)=>{
    let sql = `SELECT * FROM user_data
                WHERE User_ID = '${req.params.User_ID}'
                `;
                console.log(req.params.User_ID);

    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });          


});

// update single data 

app.put('/api/USER/:User_ID',(req,res)=>{
        console.log(req.body.User_ID);
        let sql = `UPDATE user_data 
                   SET First_Name= '${req.body.First_Name}',
                       last_Name = '${req.body.last_Name}',
                       Email_ID = '${req.body.Email_ID}',
                       Contact_Number = '${req.body.Contact_Number}' 
                   WHERE USer_ID = '${req.body.User_ID}'
                    `;
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('data updated');
        })          
})


// delete single data 

app.delete('/api/USER/:User_ID',(req,res)=>{
     let sql = `DELETE FROM user_data 
                WHERE User_ID = '${req.params.User_ID}'
                `;
        db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('data deleted');
    });         
});

