const {Router} = require ('express');
const {get_A_Book, publish_A_Book, get_All_Books, edit_A_Book, delete_A_Book} = require('../Responses/bookController');
const authMiddleware = require('../Middlewares/authMiddleware');

const bookRouter = Router()//since the line wasnt ended with ; the code below it can still be related to this line

//get all books
.get('/books', get_All_Books)
//get one book
.get('/book/:id'/*only the id number should be used in the browser without colon */, get_A_Book)
//post a book
.post('/book/', authMiddleware, publish_A_Book)
//edit a book
.put('/book/:id', authMiddleware, edit_A_Book )
//delete a book
.delete('/book/:id', authMiddleware, delete_A_Book)


module.exports = bookRouter

