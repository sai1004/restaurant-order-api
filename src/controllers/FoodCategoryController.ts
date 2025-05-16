import { Router, Request, Response } from "express";
import { FoodCategoryService } from "../services/FoodCategoryService";
import { errorResponse, successResponse } from "../utils/responseFormatter";
import { Props } from "../constants/Props";
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
                result = await this.service.save(reqData);
                res.status(200).send(successResponse(result, Props.STATUS_MESSAGES.SAVED_SUCCESSFULLY));
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        this.router.get("/category", App.verifyToken, async (req: Request, res: Response) => {
            try {
                let result = null;
                result = await this.service.getAllCategories();
                res.status(200).send(successResponse(result));
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        return this.router;
    }
}
