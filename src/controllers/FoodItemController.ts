import { Router, Request, Response  } from "express";
import { FoodItemService } from "../services/FoodItemService";
import { errorResponse, successResponse } from "../utils/responseFormatter";
import { Props } from "../constants/Props";
import { App } from "../utils/App";

import Logger from "../config/Logger";

const logger = Logger.getInstance();

export class FoodItemController {
    private router: Router = Router();
    private service = new FoodItemService();

    getRouter() {
        this.router.post("/items", App.verifyToken, async (req: Request, res: Response) => {
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

        this.router.get("/items", App.verifyToken, async (req: Request, res: Response) => {
            try {
                let reqData: any;
                reqData = req.query ? req.query : {};
                let result = null;
                result = await this.service.getAllItem(reqData);
                res.status(200).send(successResponse(result));
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        this.router.get("/items/:id", App.verifyToken, async (req: Request, res: Response) => {
            try {
                let reqData: any;
                reqData = req.params.id;
                let result = null;
                result = await this.service.getItemById(reqData);
                res.status(200).send(successResponse(result));
            } catch (error: any) {
                logger.error(error);
                res.status(error.statusCode).send(errorResponse(error?.message, error?.code, error?.statusCode));
            }
        });

        return this.router;
    }
}
