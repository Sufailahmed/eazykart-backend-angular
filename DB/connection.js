const mongoose=require('mongoose')

//get connection  string from .env file
const connectionString=process.env.Database;

//connect mongoDB
mongoose.connect(connectionString).then((res)=>{
    console.log("Mongo DB connected succefully ");
}).catch((err)=>{
    console.log(`MngoDB connect failed due to ${err}`);
})