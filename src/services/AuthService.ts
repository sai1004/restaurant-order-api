import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
import { SigninPayload, SigninResponse } from "../types/Auth";
import { App } from "../utils/App";
import { Props } from "../utils/Props";
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

    async signin(signinPayload: SigninPayload): Promise<SigninResponse | { status: number; message: string }> {
        const { email, password } = signinPayload;
        try {
            const profile = await this.dao.findOne({ email });

            if (!profile || !App.HashCompareSync(password, profile.password)) {
                return { status: 0, message: Props.INVALID_CREDENTIALS };
            }

            const accessToken = App.EncodeJWT({
                identity: { id: profile.id, name: profile.name, email: profile.email, role: profile.role },
            });
            
            return {
                identity: { id: profile.id, name: profile.name, email: profile.email, role: profile.role },
                access_token: accessToken,
            };
        } catch (error: any) {
            throw error;
        }
    }
}
