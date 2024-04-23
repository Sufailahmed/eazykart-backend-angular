const wishlist = require('../Models/wishlistModel')

exports.addToWishlists = async (req, res) => {
    const { id, title, price, description, category, image, rating } = req.body;
    const userId = req.payload;
    try {
        const existingProduct = await wishlist.findOne({ id, userId })
        if (existingProduct) {
            res.status(406).json("Product Already exist in yout wishlist")
        }
        else {
            const newProduct = new wishlist({
                id, title, price, description, category, image, rating, userId
            })
            await newProduct.save();
            res.status(200).json("product added success")
        }
    }

    catch (error) {
        res.status(401).json(error)
    }
}
exports.getFromWishlist = async (req, res) => {
    const userId = req.payload;
    try {
        const allproduct = await wishlist.find({ userId })
        res.status(200).json(allproduct)
    } catch (Error) {
        res.status(401).json("errror in gettting wishlists")
    }
}

exports.removeWishlistItem=async(req,res)=>{
    const {id}=req.params;
    try{
        const removeItem=await wishlist.findByIdAndDelete({_id:id})
        res.status(200).json("Item removed From Wishlists")
    }catch(error){
        res.status(401).json("Error in removing item")
    }
}