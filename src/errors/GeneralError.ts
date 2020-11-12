class GeneralError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    toJson = () => {
        return {
            status: this.status,
            message: this.message,
        }
    }
}

export default GeneralError;
