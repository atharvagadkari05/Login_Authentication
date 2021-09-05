const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcryptjs')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./model/user')

// Mongoose Connection
mongoose.connect('mongodb://localhost:27017/loginauth',{
    useNewUrlParser:true,
    useUnifiedTopology:true  // these statement are used to get rid of the warnings while starting server.
 })

const app = express();
app.use('/', express.static(path.join(__dirname, 'static'))) // This will make that static html page appear at localhost 400
app.use(express.json());



app.post('/api/register', async (req,res)=>{
     
//console.log(req.body)

const {username,password} = req.body; // Declaration of username and passsword


//Usernaem check:
if(username=='\0' || typeof username !== string){
    res.send( {status:'error', error:'Invalid Username'});

}

//Password check
if(username=='\0' || typeof username !== string){
    res.send( {status:'error', error:'Invalid Username'});

}
const HashedPassword =  await bcrypt.hash(password,11)  // This is used to hash the password

console.log(`your username is ${username} and password is ${HashedPassword} `)
   res.status({status:"ok"});



try {
   
   const response = await User.create(
        {
            username,
            password    // here we cannot add encrypted password
        }
    )
    console.log(`Created Successfully ${response}`)
} catch (error) {
    // We know that duplicate username error code is 11000
    if(error.code=== 11000){
        res.send("Duplicate username Error")
        
    }
    else{
    console.log("Error")
}
}

})

app.listen(4000 , ()=>{
    console.log("Listening at 4000")
})