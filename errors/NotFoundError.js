class NotFoundError extends Error {
    constructor(message = "", ...args) {
        super(message, ...args); // (1)
        this.name = "NotFoundError"; // (2)
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;


class NotImplemented extends Error {
    constructor(message = "", ...args) {
        super(message, ...args);
        this.message = message + " has not yet been implemented.";
    }
}




