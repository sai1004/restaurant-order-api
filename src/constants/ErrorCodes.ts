export const ErrorCodes = {
    VALIDATION: {
        REQUIRED_FIELD_MISSING: "001",
        INVALID_FORMAT: "002",
        VALUE_OUT_OF_RANGE: "003",
        DUPLICATE_RECORD: "004",
        UNSUPPORTED_FILE_TYPE: "005",
        INVALID_DATE: "006",
        MISSING_HEADERS: "007",
        INVALID_LENGTH: "008",
    },

    AUTH: {
        UNAUTHORIZED: "101",
        TOKEN_EXPIRED: "102",
        TOKEN_INVALID: "103",
        ACCESS_DENIED: "104",
        MULTI_FACTOR_REQUIRED: "105",
        SESSION_EXPIRED: "106",
        SUSPICIOUS_ACTIVITY: "107",
    },

    DB: {
        CONNECTION_FAILED: "201",
        QUERY_FAILED: "202",
        SAVE_FAILED: "203",
        RECORD_LOCKED: "204",
        TIMEOUT: "205",
        TRANSACTION_ROLLBACK: "206",
        DEADLOCK_DETECTED: "207",
    },

    PAYMENT: {
        CARD_DECLINED: "301",
        INSUFFICIENT_FUNDS: "302",
        INVALID_ACCOUNT: "303",
        GATEWAY_TIMEOUT: "304",
        FRAUD_DETECTED: "305",
        LIMIT_EXCEEDED: "306",
    },

    RATE_LIMIT: {
        TOO_MANY_REQUESTS: "401",
        BLOCKED_IP: "402",
        ABUSE_DETECTED: "403",
    },

    FILE: {
        UPLOAD_FAILED: "501",
        FILE_TOO_LARGE: "502",
        VIRUS_DETECTED: "503",
        STORAGE_FULL: "504",
    },

    GENERAL: {
        UNKNOWN_ERROR: "900",
        SERVICE_UNAVAILABLE: "901",
        NOT_FOUND: "902",
        OPERATION_NOT_ALLOWED: "903",
        FEATURE_DISABLED: "904",
    },
};
