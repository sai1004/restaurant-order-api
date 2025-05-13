// Success - signin
export const authSignin = {
    identity: {
        id: "MAFGBU4X",
        name: "John Doe",
        email: "johndoe@xyz.com",
        role: "staff",
    },
    access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6eyJpZCI6Ik1BRkdCVTRYIiwibmFtZSI6IlNhaWtpcmFuIiwiZW1haWwiOiJzYWlraXJhbkB4eXouY29tIiwicm9sZSI6InN0YWZmIn0sImlhdCI6MTc0NzE0MDMzMywiZXhwIjoxNzQ3MjI2NzMzfQ.1ILjm0Gwnbdgr-64QlwnjbbYwSH1yB3OEUMWWAR0JjY",
};

// Errors - signup

export const emailAlreadyExist = {
    success: false,
    message: "Your email already exists",
    error: {
        code: "004",
        details: null,
    },
    meta: {
        timestamp: "2025-05-13T12:58:02.000Z",
    },
};
