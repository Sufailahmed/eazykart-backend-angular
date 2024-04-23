const express=require('express')
const productController=require('../Controller/productController')
const userController=require('../Controller/userController')
const router=new express.Router()
const jwtMiddleware=require('../Middlwares/jwtMiddleware')
const wishlistController=require('../Controller/wishlistControler')
const cartController=require('../Controller/cartController')
//get all  product
router.get('/all-product',productController.getAllProducts)
router.post('/register',userController.register)
router.post('/login',userController.loginController)
router.get('/productDetails/:id',productController.getProductDetailsById)
router.post('/addwishlist',jwtMiddleware,wishlistController.addToWishlists)
router.get('/getWishlistItems',jwtMiddleware,wishlistController.getFromWishlist)
router.delete('/deletewishlists/:id',jwtMiddleware,wishlistController.removeWishlistItem)
router.post('/addtocart',jwtMiddleware,cartController.addTocart)
router.get('/getCartItems',jwtMiddleware,cartController.getFromCart)
router.delete('/deletecart/:id',jwtMiddleware,cartController.removeCartItem)
router.get('/increment/:id',jwtMiddleware,cartController.incrementItem)
router.get('/decrement/:id',jwtMiddleware,cartController.decrement)
router.get('/emptyCart',jwtMiddleware,cartController.emptyCart)




module.exports=router