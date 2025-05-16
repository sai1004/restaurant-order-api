export class Props {
    public static APP_NAME: string = "FOOD ORDER";
    public static SALT_KEY: string = "SALT256DL";

    public static ACCESS = {
        READ: "READ",
        WRITE: "WRITE",
    };

    public static STATUS_MESSAGES = {
        SAVED_SUCCESSFULLY: "Saved successfully.",
        UPDATED_SUCCESSFULLY: "Updated successfully.",
        DELETED_SUCCESSFULLY: "Deleted successfully.",
        FETCHED_SUCCESSFULLY: "Data fetched successfully.",
        OTP_SENT: "OTP sent successfully.",
        OTP_VERIFY: "OTP verified successfully.",
        PASSWORD_SET: "New password has been set successfully.",
        EMAIL_SENT: "Email has been sent.",
        LOGOUT_SUCCESS: "Logged out successfully.",
        PROFILE_UPDATED: "Profile updated successfully.",
    };

    public static ERROR_MESSAGES = {
        PLEASE_LOGIN: "Please log in to continue.",
        INVALID_DATA: "Please enter valid data.",
        INVALID_AUTH: "You are not authorized.",
        MOBILE_EXISTS: "This mobile number is already registered.",
        EMAIL_EXISTS: "This email address is already registered.",
        PROFILE_NOT_FOUND: "Profile not found.",
        RECORD_EXISTS: "Record already exists.",
        RECORD_NOT_EXISTS: "Record does not exist.",
        MISS_MATCH: "Record has been updated by someone else. Please refresh and try again.",
        INVALID_JWT: "Invalid JWT token.",
        INVALID_CREDENTIALS: "Invalid credentials.",
        ACCOUNT_DEACTIVATED: "Account deactivated. Please contact the administrator.",
        ENTER_VALID_EMAIL: "Please enter a valid or registered email address.",
        RESET_TECHNICAL_ISSUE: "Unable to reset due to a technical issue. We apologize for the inconvenience.",
        INVALID_TOKEN: "Please enter a valid token.",
        NO_TOKEN: "Authorization denied. Token not provided.",
        FORM_INCOMPLETE: "Please complete all required fields.",
        SERVER_ERROR: "Something went wrong. Please try again later.",
        FORBIDDEN_ACTION: "You do not have permission to perform this action.",
        SESSION_EXPIRED: "Your session has expired. Please log in again.",
        FILE_TOO_LARGE: "File size is too large. Please upload a smaller file.",
        UNSUPPORTED_FILE_TYPE: "Unsupported file type.",
        RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",
        NOT_FOUND: "Requested resource was not found.",
    };

    public static VALIDATION_MESSAGES = {
        REQUIRED_FIELD: "This field is required.",
        INVALID_EMAIL: "Invalid email address.",
        PASSWORD_MIN_LENGTH: "Password must be at least 8 characters.",
        PASSWORDS_DO_NOT_MATCH: "Passwords do not match.",
        INVALID_PHONE: "Invalid phone number.",
        MAX_LENGTH_EXCEEDED: "Maximum length exceeded.",
    };

    public static TRACK_STATUS = {
        NEW: "NEW",
        PROCESSING: "PROCESSING",
        COMPLETE: "COMPLETE",
        CANCEL: "CANCEL",
        PAID: "PAID",
        REFUND: "REFUND",
        REPAID: "REPAID",
        DISCONNECT: "DISCONNECT",
        BOOKING: "BOOKING",
        CHECK_IN: "CHECK-IN",
        CHECK_OUT: "CHECK-OUT",
    };

    public static PROFILE_STATUS = {
        VERIFIED: "VERIFIED",
        IN_PROGRESS: "IN PROGRESS",
        UNVERIFIED: "UNVERIFIED",
        CHANGE_REQUIRED: "CHANGE REQUIRED",
        PENDING_APPROVAL: "PENDING APPROVAL",
        REJECTED: "REJECTED",
    };

    public static PROFILE_ROLE = {
        STAFF: "STAFF",
        ADMIN: "ADMIN",
    };

    public static VALIDATION = {
        REQUIRED_FIELD_MISSING: "Required field is missing.",
        INVALID_FORMAT: "The input format is invalid.",
        VALUE_OUT_OF_RANGE: "The value is out of the acceptable range.",
        DUPLICATE_RECORD: "A record with similar details already exists.",
        UNSUPPORTED_FILE_TYPE: "The uploaded file type is not supported.",
        INVALID_DATE: "The provided date is invalid or incorrectly formatted.",
        MISSING_HEADERS: "Required request headers are missing.",
        INVALID_LENGTH: "Input length is invalid or exceeds allowed limit.",
    };

    public static AUTH = {
        UNAUTHORIZED: "You are not authorized to perform this action.",
        TOKEN_EXPIRED: "Your session has expired. Please log in again.",
        TOKEN_INVALID: "The authentication token is invalid.",
        ACCESS_DENIED: "Access denied. You do not have the required permissions.",
        MULTI_FACTOR_REQUIRED: "Multi-factor authentication is required.",
        SESSION_EXPIRED: "Your session has expired. Please sign in again.",
        SUSPICIOUS_ACTIVITY: "Suspicious activity detected. Please verify your identity.",
    };

    public static DB = {
        CONNECTION_FAILED: "Failed to connect to the database.",
        QUERY_FAILED: "An error occurred while executing the database query.",
        SAVE_FAILED: "Unable to save data to the database.",
        RECORD_LOCKED: "The record is currently locked and cannot be modified.",
        TIMEOUT: "Database operation timed out.",
        TRANSACTION_ROLLBACK: "Transaction failed and has been rolled back.",
        DEADLOCK_DETECTED: "Database deadlock detected. Please try again.",
    };

    public static PAYMENT = {
        CARD_DECLINED: "Your card was declined by the bank.",
        INSUFFICIENT_FUNDS: "Insufficient funds in the account.",
        INVALID_ACCOUNT: "Invalid payment account details provided.",
        GATEWAY_TIMEOUT: "Payment gateway timed out. Please try again.",
        FRAUD_DETECTED: "Potential fraudulent activity detected. Payment blocked.",
        LIMIT_EXCEEDED: "Transaction limit exceeded. Please try a smaller amount.",
    };

    public static RATE_LIMIT = {
        TOO_MANY_REQUESTS: "Too many requests. Please slow down and try again later.",
        BLOCKED_IP: "Access from this IP address has been temporarily blocked.",
        ABUSE_DETECTED: "Abusive behavior detected. Access restricted.",
    };

    public static FILE = {
        UPLOAD_FAILED: "File upload failed. Please try again.",
        FILE_TOO_LARGE: "The uploaded file exceeds the maximum allowed size.",
        VIRUS_DETECTED: "The uploaded file contains a virus and was rejected.",
        STORAGE_FULL: "File storage is full. Cannot upload at this time.",
    };

    public static GENERAL = {
        UNKNOWN_ERROR: "An unknown error occurred. Please try again later.",
        SERVICE_UNAVAILABLE: "The service is temporarily unavailable. Please try again later.",
        NOT_FOUND: "The requested resource could not be found.",
        OPERATION_NOT_ALLOWED: "This operation is not allowed.",
        FEATURE_DISABLED: "This feature is currently disabled.",
    };
}
