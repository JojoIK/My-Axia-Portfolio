const bookModel = require("../DBModel/bookModel")
const userModel = require("../DBModel/userModel")
//CRUD Operations
/*This module containing CRUD Operation functiond are endpoint functions */

//GET: Get all books
const get_All_Books = async (req, res, next) => {
    try {
        books = await bookModel.find()/*mogoDB method that allows us return every item 
         in that particular collection of the database*/
        res.json(books).status(200)
    } catch (err) {
        next(err)
    }
}

//GET: Get a book
const get_A_Book = async (req, res, next) => {
    const {id} = req.params
    try {
        const returnedBook = await bookModel.findById(id)
        if (!returnedBook) return res.status(404).json({msg:'Book not found'})
        res.json(returnedBook).status(200)
    } catch (err) {
        next(err)
    }
}

//POST: Create a book
const publish_A_Book = async (req, res, next) => {
    const userInfo = req.user
    try {
        const user = await userModel.findById(userInfo._id)
        if(!user){
            return res.status(404).json({msg: 'Register before you can publish'})
        }
        const createBook = new bookModel({
            ...req.body,
            userId: user._id
        })//using the 'bookModel' to collect data from the frontend and 'new' for each new request
        const newbookWithUserId= await createBook.save()// saving models with the collected data to the database

        user.Publications.push(newbookWithUserId._id)
        await user.save()
        
        res.status(200).json(newbookWithUserId)// sending response to the frontend
        /*sending a status is not necessary when using the database cause if the code acts correctly,
        a status would autimatically show, unless you just want to hardcode.*/
    } catch (err) {
        next(err)
    }
}
/*When you are making a call to a database, calling an external API you must use async function and await.
Async should come before the parenthesis '()'. */

//PUT: Update a book
const edit_A_Book = async (req, res, next) => {
    const updateBook = {...req.body}
    const {id} = req.params
    const userInfo = req.user
    try {
        const user = await userModel.findById(userInfo._id)
        const bookToUpdate = await bookModel.findById(id)
        if (!bookToUpdate) {
            return res.status(404).json({msg:'Book not found'})
        }

        if(!bookToUpdate.userId.equals(userInfo._id)) { //.equals() method to safely compare
            return res.status(403).json({msg: 'User can only update book that they published'})
        }
        
        const updatedBook = await bookModel.findByIdAndUpdate(id, updateBook, {new: true})
        /*the above line finds the book by id and updates it with the new data 
         passing 'updateBook' as an arguement, shows the fied to update*/
    if (!updatedBook) {
        return res.status(404).json({msg:'Book not found'})
        }
    res.json(updatedBook).status(200)
    } catch (err) {
        next(err)
    }
}

//DELETE: Delete a book
const delete_A_Book = async (req, res, next) => {
    const {id} = req.params
    const userData = req.user
    try {
        const user = await userModel.findById(userData._id)
        const bookToDelete = await bookModel.findById(id)
        if (!bookToDelete) {
            return res.status(404).json({msg: 'Book not found'})
        }
        if (!bookToDelete.userId.equals(userData._id)) {
            return res.status(403).json({msg: 'User can only delete book that they published'})
        }
        
        const removeBook = await bookModel.findByIdAndDelete(id)
    if (!removeBook) return res.status(404).json({msg: 'Book not found'})
    res.status(200).json({msg: 'Book has been deleted'})
    } catch (err) {
        next(err)
    }
}

module.exports = {get_All_Books, get_A_Book, publish_A_Book, edit_A_Book, delete_A_Book}











