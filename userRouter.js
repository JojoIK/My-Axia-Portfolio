const {Router} = require ('express');
const {signup, login} = require('../Responses/userController');

const userRouter = Router()
.post('/user/signup', signup)
.post('/user/login', login)


module.exports = userRouter
