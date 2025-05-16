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
}
