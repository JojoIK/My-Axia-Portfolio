//This is the module that helps us connect to the database
const mongoose = require('mongoose')


const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO)
        /*.connect() is the method for connecting to the database, it takes the url to the particular database 
        you want to connect to */
    } catch (err) {
        return console.log(err)
    }
    console.log('Connected to DB')
} 

module.exports = connectDB