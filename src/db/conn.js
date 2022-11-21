const mongoose=require("mongoose");
const url="mongodb://127.0.0.1:27017";
mongoose.connect(url,{
    
}).then(()=>{
    console.log("connection is successfull");
}).catch((err)=>{
    console.log(err);
})