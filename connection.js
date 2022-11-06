const mongoose = require('mongoose');
//connect to mongoDB

/*module.exports = ()=>{
    mongoose.connect("mongodb://localhost:27017/passport",{
        useNewUrlParser:true,useUnifieldTopology:true

    },(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("Successfully connected");
        }
    })
}*/

module.exports=()=>{
    mongoose.connect('mongodb://localhost/auth1');
    mongoose.connection.once('open',()=>{
        console.log('connection has been made');
    }).on('error',(error)=>console.log(error));
}