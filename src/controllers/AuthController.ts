import { Router } from "express";
import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";

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
                let result = null;
                res.send({ status: 1, data: result });
            } catch (error: any) {
                console.log(error);
                res.send({ status: 0, error: error?.message });
            }
        });

        return this.router;
    }
}
