export class AppError extends Error {
    public statusCode: number;
    public code: string;
    public details?: any;

    constructor(message: string, code: string, statusCode = 400, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}
