import { Router, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { errorResponse, successResponse } from "../utils/responseFormatter";
import { Props } from "../utils/Props";
import Logger from "../config/Logger";

const logger = Logger.getInstance();

export class AuthController {
    private router: Router = Router();
    private authService = new AuthService();

    getRouter() {
        this.router.post("/signup", async (req: Request, res: Response) => {
            try {
                let reqData = req.body ? req.body : {};
                let result = null;
                result = await this.authService.signup(reqData);
                if (result?.id) {
                    res.status(200).send(successResponse(result, Props.SAVED_SUCCESSFULLY));
                }
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        this.router.post("/signin", async (req: Request, res: Response) => {
            try {
                let reqData: any = req.body;
                let result: any = null;
                if (reqData) {
                    result = await this.authService.signin(reqData);
                    if (result?.access_token) {
                        res.status(200).send(result);
                    } else {
                        res.status(401).send({ status: 0, message: Props.INVALID_CREDENTIALS });
                    }
                } else {
                    res.status(401).send({ status: 0, message: Props.INVALID_CREDENTIALS });
                }
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        return this.router;
    }
}
