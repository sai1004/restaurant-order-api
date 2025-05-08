import { Router } from "express";
import { FoodItemService } from "../services/FoodItemService";
import { Request, Response } from "express";

export class FoodItemController {
    private router: Router = Router();
    private service = new FoodItemService();

    getRouter() {
        this.router.get("/items", async (req: Request, res: Response) => {
            try {
                let reqData: any;
                reqData = req.query ? req.query : {};
                let result = null;
                result = await this.service.getAllItem(reqData);
                res.send({ status: 1, data: result });
            } catch (error: any) {
                console.log(error);
                res.send({ status: 0, error: error?.message });
            }
        });

        this.router.get("/items/:id", async (req: Request, res: Response) => {
            try {
                let reqData: any;
                reqData = req.params.id;
                let result = null;
                result = await this.service.getItemById(reqData);
                res.send({ status: 1, data: result });
            } catch (error: any) {
                console.log(error);
                res.send({ status: 0, error: error?.message });
            }
        });

        this.router.post("/items", async (req: Request, res: Response) => {
            try {
                let reqData = req.body ? req.body : {};
                let result = null;
                console.log("reqData", req.body);
                result = await this.service.save(reqData);
                res.send({ status: 1, data: result });
            } catch (error: any) {
                console.log(error);
                res.send({ status: 0, error: error?.message });
            }
        });
        return this.router;
    }
}
