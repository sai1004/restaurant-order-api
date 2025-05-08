import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
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
}
