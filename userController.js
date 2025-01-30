const userModel = require("../DBModel/userModel")
const bcrypt = require('bcryptjs')
const generateToken = require("../jwt/generateToken")

const signup = async (req, res, next) => {
    const {Password, Gmail, Username} = req.body
    if (!Password || !Gmail || !Username) {
        return res.status(400).json({msg: 'All input fields must be entered'})
    }
    try {
        const client = await userModel.findOne({Gmail})// whhen key and velue pair is the same thing theres no need for passing the value just leave the key name alone
        if (client) {
            return res.status(409).json('User already exists')//a conflict statuscode
        }
        const salt = bcrypt.genSaltSync(7)
        const hashedPassword = bcrypt.hashSync(Password, salt)
        const user = {...req.body, Password: hashedPassword}// replacing the the unencrypted password with the harshedPassword

        const newUser = new userModel(user)
        await newUser.save()
        res.status(200).json({msg: 'User created successfully', newUser})
    } catch (error) {
        const err = {
            status: error.status || 500,
            message: error.message || 'Something went wrong'
        }
        next(err)
        console.log(error)
    }
}


const login = async (req, res) => {
    const {Gmail, Password} = req.body
    try {
        const User = await userModel.findOne({Gmail})
        if (!User) {
            return res.status(400).json({msg: 'Password or Gmail is incorrect'})
        }
        const comparison = await bcrypt.compare(Password, User.Password)
        if (!comparison) {
            return res.status(400).json({msg: 'Password or Gmail is incorrect'})
        }

       //remove users password from the res.json 
        const {Password: _, ...userData} = User.toObject()
        
        //Generation of token to set cookie
        const token = generateToken(User._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_Env === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        })  
        res.status(200).json({User: userData})
    } catch (error) {
        const err = {
            status: error.status || 500,
            message: error.message || 'Something went wrong'
        }
        next(err)
        console.log(error)    
    }
}

module.exports = {signup, login}