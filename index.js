const router=require('./Routes/route')
require('dotenv').config();

const express=require('express')
const cors=require('cors')
require('./DB/connection')
const cartServer=express();
cartServer.use(cors())
cartServer.use(express.json())
cartServer.use(router)

const PORT=3000
cartServer.listen(PORT,()=>{
    console.log(`Cart server is running on ${PORT}`);
})