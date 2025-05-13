import { ErrorCodes } from "../constants/ErrorCodes";
import { AppError } from "../utils/AppError";
import { errorResponse } from "../utils/responseFormatter";

export function globalErrorHandler(err: any, req: any, res: any, next: any) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(errorResponse(err.message, err.code, err.statusCode, err.details));
    }

    return res.status(500).json(errorResponse("Internal Server Error", "GEN_001", 500));
}
