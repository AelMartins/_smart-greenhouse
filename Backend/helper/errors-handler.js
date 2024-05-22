module.exports = {
    responseError: (res, error) => {
        console.error(error.message)
        return res.response({ message: error.message }).code(error.statusCode || 400)
    }
}