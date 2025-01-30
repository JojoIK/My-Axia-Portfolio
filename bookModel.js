const mongoose = require('mongoose')

// This is a module that contains the schema ie the skeletal structure for which data is stored in the database.

const bookSchema = new mongoose.Schema(
/* 'new' because a new template is formed everytime a request comes in and '.Schema' recieves arguements as objects*/
    {
        BookName: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        YearOfPublication: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user',
            required: true
        }
    },
    /*
    Above the value of the key is another object because you have to define the behaviour (eg if the type is a number or 
    string, etc) of that particular input feed(key). That is how mongoDB and your code knows what you mean. 
    */
   {timestamps: true}
)

module.exports = mongoose.model('Book'/*creates a name of collection in MongoDB*/, bookSchema)
/*mongoose is used when exporting so you can acces the database wherever ever the variable is being exported to*/