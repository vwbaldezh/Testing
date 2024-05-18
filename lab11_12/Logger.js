class Logger {
    static log(message) {
        console.log(message);
    }

    static error(message, error) {
        console.error(message, error);
    }
}

module.exports = Logger;