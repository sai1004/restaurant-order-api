export interface SigninPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface SigninResponse {
    identity: Identity;
    access_token: string;
}

export interface Identity {
    id: string;
    name: string;
    email: string;
    role: string;
}
