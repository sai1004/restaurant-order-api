import { Router } from "express";
import { FoodCategoryService } from "../services/FoodCategoryService";
import { Request, Response } from "express";

export class FoodCategoryController {
    private router: Router = Router();

    private service = new FoodCategoryService();

    getRouter() {
        this.router.post("/category", async (req: Request, res: Response) => {
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

        this.router.get("/category", async (req: Request, res: Response) => {
            try {
                let result = null;
                result = await this.service.getAllCategories();
                res.send({ status: 1, data: result });
            } catch (error: any) {
                console.log(error);
                res.send({ status: 0, error: error?.message });
            }
        });

        return this.router;
    }
}