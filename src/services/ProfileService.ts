import { ErrorCodes } from "../constants/ErrorCodes";
import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
import { App } from "../utils/App";
import { AppError } from "../utils/AppError";
import { Props } from "../constants/Props";

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
                    status: 1,
                    message: Props.STATUS_MESSAGES.SAVED_SUCCESSFULLY,
                };
            }
        } catch (error: any) {
            throw error;
        }
    }

    async updateProfile(profile: Profile) {
        try {
            let oldProfile = await this.dao.search({ email: profile.email });

            if (oldProfile.length > 0) {
                let newProfile: any = await this.dao.save(profile);
                return {
                    id: newProfile.id,
                    status: 1,
                    message: Props.STATUS_MESSAGES.UPDATED_SUCCESSFULLY,
                };
            }
            throw new AppError(Props.ERROR_MESSAGES.PROFILE_NOT_FOUND, ErrorCodes.GENERAL.NOT_FOUND, 404);
        } catch (error: any) {
            throw error;
        }
    }

    async validateProfile(profile: Profile) {
        try {
            let oldProfile = await this.dao.search({ email: profile.email });

            if (oldProfile.length > 0) {
                throw new AppError(Props.ERROR_MESSAGES.EMAIL_EXISTS, ErrorCodes.VALIDATION.DUPLICATE_RECORD, 409);
            }

            let uniqueId: string = App.UniqueCode();
            profile.id = uniqueId;
            profile.role = Props.PROFILE_ROLE.STAFF;
            profile.updatedOn = new Date();
            return true;
        } catch (error: any) {
            throw error;
        }
    }
}
