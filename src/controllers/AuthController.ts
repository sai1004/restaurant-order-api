import { Router } from "express";
import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { Props } from "../utils/Props";

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
                    res.status(200).send(result);
                }
            } catch (error: any) {
                console.log(error);
                res.status(500).send({ status: 0, error: error?.message });
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
                console.log(error);
                res.send({ status: 0, error: error?.message });
            }
        });

        return this.router;
    }
}
