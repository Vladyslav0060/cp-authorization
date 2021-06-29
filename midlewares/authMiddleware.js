const jwt = require('jsonwebtoken')
const {secret} = require('../config')


module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(403).json({message:"User unauthorised"})
        const decodedData = jwt.verify(token,secret)
        req.user = decodedData
        next()
    } catch (error) {
       console.log(error) 
       return res.status(403).json({message:"User unauthorised"})
    }
}