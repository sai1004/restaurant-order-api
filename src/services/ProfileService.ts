import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
import { App } from "../utils/App";
import { Props } from "../utils/Props";

export class ProfileService {
    uniqueId: number = 0;
    private dao: ProfileDAO;

    constructor() {
        this.dao = new ProfileDAO();
    }

    async saveProfile(profile: Profile) {
        try {
            let isValid = await this.validateProfile(profile);

            if (isValid) {
                profile.password = App.HashSync(profile.password);
                profile.token = "dummyToken";
                let newProfile: any = await this.dao.save(profile);
                return {
                    id: newProfile.id,
                    message: Props.SAVED_SUCCESSFULLY,
                };
            }
        } catch (error: any) {
            throw error;
        }
    }

    async validateProfile(profile: Profile) {
        try {
            let oldProfile = await this.dao.search({ email: profile.email });

            if (oldProfile.length > 0) {
                throw new Error(Props.RECORD_EXISTS);
            } else {
                let uniqueId: string = App.UniqueCode();
                profile.id = uniqueId;
                profile.role = "staff";
                profile.updatedOn = new Date(new Date().toISOString());
                return true;
            }
        } catch (error: any) {
            throw error;
        }
    }
}
