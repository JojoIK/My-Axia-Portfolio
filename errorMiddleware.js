const err = (err, req, res, next) => {
    console.log(err)//Log the error for debugging
    const statuscode = err.status|| 500 // Default to 500 if no status is provided
    const message = err.message || 'Internal Server Error'

    //Send the error response
    res.status(statuscode).json({
        error: {
            message: message,
            statuscode: statuscode
        }
    })
}

module.exports = err