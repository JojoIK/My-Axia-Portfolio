const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        Username: {
            type: String,
            required: true,
            unique: true
        },
        Gmail: {
            type: String,
            required: true,
            unique: true
        },
        Password: {
            type: String,
            required: true
        },
        Publications: [
            {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'book'
            }
        ]
    },
   {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)
