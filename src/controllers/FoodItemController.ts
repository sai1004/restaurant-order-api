import { Router } from "express";
import { FoodItemService } from "../services/FoodItemService";
import { Request, Response } from "express";
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
                res.status(200).send({ status: 1, data: result });
            } catch (error: any) {
                logger.error(error);
                res.status(500).send({ status: 0, error: error?.message });
            }
        });

        this.router.get("/items", App.verifyToken, async (req: Request, res: Response) => {
            try {
                let reqData: any;
                reqData = req.query ? req.query : {};
                let result = null;
                result = await this.service.getAllItem(reqData);
                res.status(200).send({ status: 1, data: result });
            } catch (error: any) {
                logger.error(error);
                res.status(500).send({ status: 0, error: error?.message });
            }
        });

        this.router.get("/items/:id", App.verifyToken, async (req: Request, res: Response) => {
            try {
                let reqData: any;
                reqData = req.params.id;
                let result = null;
                result = await this.service.getItemById(reqData);
                res.status(200).send({ status: 1, data: result });
            } catch (error: any) {
                logger.error(error);
                res.status(500).send({ status: 0, error: error?.message });
            }
        });

        return this.router;
    }
}
