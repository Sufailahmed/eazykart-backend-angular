const products=require('../Models/productModel')
//get all products
exports.getAllProducts=async(req,res)=>{
    try{
        const allproducts=await products.find()
        res.status(200).json(allproducts)

    }catch(error){
        res.status(406).json(error)
    }
}

exports.getProductDetailsById=async(req,res)=>{
const {id}=req.params
try{
    const getProducts=await products.findOne({id});
    res.status(200).json(getProducts)

}catch(error){
    res.status(401).json(error)
}
}
