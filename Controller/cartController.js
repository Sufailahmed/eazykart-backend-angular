const carts = require('../Models/cartModel')

exports.addTocart = async (req, res) => {
    const userId = req.payload;
    const { id, title, price, description, category, image, rating, quantity } = req.body
    try {
        const existingProduct = await carts.findOne({ id, userId })
        if (existingProduct) {
            existingProduct.quantity = existingProduct.quantity + 1
            existingProduct.grandTotoal = existingProduct.quantity * existingProduct.price;
            await existingProduct.save();
            res.status(200).json("Item added to cart")

        }
        else {
            const newProduct = new carts({
                userId,
                id,
                title,
                price,
                description,
                category,
                image,
                rating,
                quantity,
                grandTotoal: price,
            })
            await newProduct.save();
            res.status(200).json("New Item added To cart")
        }

    } catch (error) {
        res.status(401).json(error)
    }
}
exports.getFromCart = async (req, res) => {
    const userId = req.payload;
    try {
        const allproduct = await carts.find({ userId })
        res.status(200).json(allproduct)
    } catch (Error) {
        res.status(401).json("errror in gettting wishlists")
    }
}

exports.removeCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const removeItem = await carts.findByIdAndDelete({ _id: id })
        res.status(200).json("Item removed From Wishlists")
    } catch (error) {
        res.status(401).json("Error in removing item")
    }
}

exports.incrementItem = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedItem = await carts.findOne({ _id: id })
        if (selectedItem) {
            selectedItem.quantity += 1
            selectedItem.grandTotoal = selectedItem.price * selectedItem.quantity
            await selectedItem.save();
            res.status(200).json("Incremented succefully")
        }
        else {
            res.status(401).json("No such product")
        }


    } catch (error) {
        res.status(401).json(error)
    }

}

exports.decrement = async (req, res) => {
    const { id } = req.params;
    try {
             const selectedItem=await carts.findOne({_id:id})
             if(selectedItem){
                selectedItem.quantity-=1;
                if(selectedItem.quantity==0){
                 
                    await carts.deleteOne({_id:id})
                    res.status(200).json("item Removed from cart")
                }
                else{
                    selectedItem.grandTotoal = selectedItem.price * selectedItem.quantity
                    await selectedItem.save();
            res.status(200).json("decremented succefully")

                }
             }
    }
    catch (error) {
        res.status(401).json(error)
    }
}
exports.emptyCart=async(req,res)=>{
    const userId=req.payload
    try{
          await carts.deleteMany({userId})
          res.status(200).json("Cart deleted succefully")

    }catch(error){
        res.status(401).json(error)
    }
}