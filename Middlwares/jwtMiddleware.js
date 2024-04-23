const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        console.log(token);
        const jwtResponse=jwt.verify(token,process.env.SECRET_KEY);
        req.payload=jwtResponse.userId
        console.log(jwtResponse);

        next()
    } catch (error) {
res.status(401).json("Authorization Failed,Please Login")
    }
}
module.exports=jwtMiddleware