export default function validate(...fnArr) {}

export class ValidateError extends Error {
    constructor(message) {
        super(message);
        this.innerErrors = {}
    }

    add(field, error) {
        this.innerErrors[field] = error;
    }
}