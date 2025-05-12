export const successResponse = (data: any = {}, message = "Success", statusCode = 200) => {
    return {
        success: true,
        message,
        data,
        meta: {
            timestamp: new Date().toISOString(),
        },
    };
};

export const errorResponse = (
    message = "Something went wrong",
    code = "INTERNAL_ERROR",
    statusCode = 500,
    details: any = null
) => {
    return {
        success: false,
        message,
        error: {
            code,
            details,
        },
        meta: {
            timestamp: new Date().toISOString(),
        },
    };
};
