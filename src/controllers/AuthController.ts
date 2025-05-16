import { Router, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { errorResponse, successResponse } from "../utils/responseFormatter";
import { Props } from "../constants/Props";
import Logger from "../config/Logger";

const logger = Logger.getInstance();

export class AuthController {
    private router: Router = Router();
    private authService = new AuthService();

    getRouter() {
        this.router.post("/signup", async (req: Request, res: Response) => {
            let reqData = req.body ? req.body : {};
            try {
                let result = null;
                result = await this.authService.signup(reqData);
                if (result?.id) {
                    res.status(200).send(successResponse(result, Props.STATUS_MESSAGES.SAVED_SUCCESSFULLY));
                }
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        this.router.post("/signin", async (req: Request, res: Response) => {
            let reqData: any = req.body ? req.body : {};
            try {
                let result: any = null;
                if (reqData) {
                    result = await this.authService.signin(reqData);
                    if (result?.access_token) {
                        res.status(200).send(result);
                    } else {
                        res.status(401).send({ status: 0, message: Props.ERROR_MESSAGES.INVALID_CREDENTIALS });
                    }
                } else {
                    res.status(401).send({ status: 0, message: Props.ERROR_MESSAGES.INVALID_CREDENTIALS });
                }
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        this.router.post("/forgot-password", async (req: Request, res: Response) => {
            const { email } = req.body ? req.body : "";
            try {
                let result: any = null;
                if (email) {
                    result = await this.authService.sendResetPasswordEmail(email);
                    if (result?.status === 1) {
                        res.status(200).json(result);
                    }
                }
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        this.router.post("/reset-password/:token", async (req: Request, res: Response) => {
            const { token } = req.params;
            const { newPassword } = req.body ? req.body : "";

            try {
                let result: any = null;
                if (token && newPassword) {
                    result = await this.authService.resetPasswordWithToken(token, newPassword);
                    if (result?.status === 1) {
                        res.json(result);
                    }
                }
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        /*  Frontend Flow (Summary)
        /forgot-password form with email field
        Email contains link: http://yourapp.com/reset-password/:token
        /reset-password/:token form with new password field
    */
        return this.router;
    }
}
