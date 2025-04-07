import { Router } from "express";
import { FoodCategoryService } from "../services/FoodCategoryService";
import { Request, Response, NextFunction } from "express";

export class FoodCategoryController {
    private router: Router = Router();

    private service = new FoodCategoryService();

    getRouter() {
        this.router.post("/create", async (req: Request, res: Response) => {
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
