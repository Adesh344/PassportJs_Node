const mongoose = require('mongoose');


exports.mongooseConnect =()=>{mongoose.connect('mongodb://127.0.0.1:27017/AuthPractice')
.then((e)=>console.log("database is connected"))
.catch((e)=>console.log(e))}


const userSchema = new mongoose.Schema({
    name:"String",
    username:{
        type:"String",
        require:true,
        unique:true
    },
    password:{
        type:"String",
        require:true,
    }
})

exports.User = mongoose.model("user",userSchema);