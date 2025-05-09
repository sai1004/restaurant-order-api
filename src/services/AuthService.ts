import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
import { SigninPayload, SigninResponse } from "../types/Auth";
import { App } from "../utils/App";
import { ProfileService } from "./ProfileService";

export class AuthService {
    private dao: ProfileDAO;
    private profileService: ProfileService;

    constructor() {
        this.dao = new ProfileDAO();
        this.profileService = new ProfileService();
    }

    async signup(profile: Profile) {
        try {
            let data = await this.profileService.saveProfile(profile);
            return data;
        } catch (error: any) {
            throw error;
        }
    }

    async signin(signinPayload: SigninPayload): Promise<SigninResponse | { message: string }> {
        try {
            let { email, password } = signinPayload;
            let profile: Profile | null = await this.dao.findOne({ email: email });
            if (!profile) return { message: "Invalid credentials" };

            let isMatch: boolean = App.HashCompareSync(password, profile.password);
            if (!isMatch) return { message: "Invalid credentials" };

            const signinResponse: SigninResponse = {
                identity: { id: profile.id, name: profile.name, email: profile.email, role: profile.role },
                access_token: "",
            };

            signinResponse.access_token = App.EncodeJWT(signinResponse);

            return signinResponse;
        } catch (error: any) {
            throw error;
        }
    }
}
