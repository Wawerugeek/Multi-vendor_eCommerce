const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next ) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

    // wrong db id error
    if (err.name === "CastError") {
        const message = `Resources not found with this id.. invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // dublicate key error
    if(err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // jwt error
    if(err.name === "JsonWebTokenError"){
        const message = `Your url is invalid please try again later`;
        err = new ErrorHandler(message, 400)
    }
}