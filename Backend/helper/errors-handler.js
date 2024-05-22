module.exports = {
    responseError: (res, error) => {
        return res.response({ message: error.message }).code(error.statusCode || 400)
    }
}