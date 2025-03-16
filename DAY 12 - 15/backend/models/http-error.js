class HttError extends Error{
    constructor(message,errorCode){
        super(message);
        this.code = errorCode;
    }
}

module.exports = HttError