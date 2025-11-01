export const sendResponse = (res, data, message, statusCode = 200) => {
    const responseBody = {
        success: true,
        message: message,
        data: data,
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(responseBody);
};
export const sendErrorResponse = (res, error, message, statusCode = 400) => {
    const errorResponseBody = {
        success: false,
        message: message,
        statusCode: statusCode,
        error: error,
        timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(errorResponseBody);
};
//# sourceMappingURL=responseHandler.js.map