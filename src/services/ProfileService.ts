import { ErrorCodes } from "../constants/errorCodes";
import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
import { App } from "../utils/App";
import { AppError } from "../utils/AppError";
import { Props } from "../utils/Props";

export class ProfileService {
    uniqueId: number = 0;
    private dao: ProfileDAO;

    constructor() {
        this.dao = new ProfileDAO();
    }

    async saveProfile(profile: Profile) {
        try {
            let isValid: boolean = await this.validateProfile(profile);

            if (isValid) {
                profile.password = App.HashSync(profile.password);
                profile.token = "dummyToken";
                let newProfile: any = await this.dao.save(profile);
                return {
                    id: newProfile.id,
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
                throw new AppError(Props.EMAIL_EXISTS, ErrorCodes.VALIDATION.DUPLICATE_RECORD, 409);
            } else {
                let uniqueId: string = App.UniqueCode();
                profile.id = uniqueId;
                profile.role = "staff";
                profile.updatedOn = new Date();
                return true;
            }
        } catch (error: any) {
            throw error;
        }
    }
}
