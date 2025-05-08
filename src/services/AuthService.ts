import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
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

    async signin(reqData: any) {
        try {
            let { email, password } = reqData;
            let profile: Profile | null = await this.dao.findOne({ email: email });
            if (!profile) return { message: "Invalid credentials" };

            let isMatch: boolean = App.HashCompareSync(password, profile.password);
            if (!isMatch) return { message: "Invalid credentials" };

            let responseData: any = {};

            responseData.identity = {};
            responseData.identity.id = profile.id;
            responseData.identity.name = profile.name;
            responseData.identity.email = profile.email;
            responseData.access_token = App.EncodeJWT(responseData);

            return responseData;
        } catch (error: any) {
            throw error;
        }
    }
}
