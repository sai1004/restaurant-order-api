import { Router } from "express";
import { FoodCategoryService } from "../services/FoodCategoryService";
import { Request, Response } from "express";
import { App } from "../utils/App";
import Logger from "../config/Logger";
const logger = Logger.getInstance();

export class FoodCategoryController {
    private router: Router = Router();

    private service = new FoodCategoryService();

    getRouter() {
        this.router.post("/category", App.verifyToken, async (req: Request, res: Response) => {
            try {
                let reqData = req.body ? req.body : {};
                let result = null;
                console.log("reqData", req.body);
                result = await this.service.save(reqData);
                res.status(200).send({ status: 1, data: result });
            } catch (error: any) {
                logger.error(error);
                res.status(500).send({ status: 0, error: error?.message });
            }
        });

        this.router.get("/category", App.verifyToken, async (req: Request, res: Response) => {
            try {
                let result = null;
                result = await this.service.getAllCategories();
                res.status(200).send({ status: 1, data: result });
            } catch (error: any) {
                logger.error(error);
                res.status(500).send({ status: 0, error: error?.message });
            }
        });

        return this.router;
    }
}
