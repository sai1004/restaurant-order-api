import { ProfileDAO } from "../daos/ProfileDAO";
import { Profile } from "../entities/Profile";
import { SigninPayload, SigninResponse } from "../types/Auth";
import { App } from "../utils/App";
import { Props } from "../utils/Props";
import { ProfileService } from "./ProfileService";
import crypto from "crypto";

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
                return { status: 0, message: Props.ERROR_MESSAGES.INVALID_CREDENTIALS };
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

    async sendResetPasswordEmail(email: string) {
        try {
            const profile = await this.dao.findOne({ email });
            if (!profile) return { status: 0, message: Props.ERROR_MESSAGES.PROFILE_NOT_FOUND };

            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutes

            profile.token = resetToken;
            // profile.resetTokenExpiry = resetTokenExpiry;

            await this.profileService.updateProfile(profile);

            const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

            console.log(`Reset Link: ${resetLink}`);
            const html = `
            <p>Hello,</p>
            <p>You requested a password reset. Click the link below to reset it:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link will expire in 15 minutes.</p>
            `;

            await App.sendEmail(profile.email, "Password Reset Request", html);

            return { status: 1, message: "Reset link sent to email" };
        } catch (error: any) {
            throw error;
        }
    }

    async resetPasswordWithToken(token: string, newPassword: string) {
        try {
            // const user = await User.findOne({
            //     resetToken: token,
            //     resetTokenExpiry: { $gt: Date.now() }, // token still valid
            // });

            const profile = await this.dao.findOne({ token });

            if (!profile) return { status: 0, message: "Invalid or expired token" };

            const hashedPassword = App.HashSync(newPassword);
            profile.password = hashedPassword;
            profile.token = "";
            // profile.resetTokenExpiry = "";
            await this.profileService.updateProfile(profile);
            return { status: 1, message: "Password has been reset successfully" };
        } catch (error: any) {
            throw error;
        }
    }
}
