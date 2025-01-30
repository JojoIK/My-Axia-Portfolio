const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    //sign is a method that accepts 3 params, which is what is used to create the actual token
}

module.exports = generateToken