import { Router } from "express";
import { FoodItemService } from "../services/FoodItemService";

export class FoodItemController {
    private router: Router = Router();

    private service = new FoodItemService();

    getRouter() {
        this.router.post("/create", async (req: any, res: any) => {
            try {
                let reqData = req.body ? req.body : {};
                let result = null;
                console.log("reqData", req.body);
                result = await this.service.save(reqData);
                res.send({ status: 1, data: result });
            } catch (error) {
                console.log(error);
                res.send({ status: 0, error: error });
            }
        });
        return this.router;
    }
}
