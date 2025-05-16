import { FoodCategoryDAO } from "../daos/FoodCategoryDAO";
import { FoodCategory } from "../entities/FoodCategory";
import { Props } from "../constants/Props";

export class FoodCategoryService {
    private dao: FoodCategoryDAO;

    constructor() {
        this.dao = new FoodCategoryDAO();
    }

    async save(data: FoodCategory) {
        try {
            let isValid: boolean = await this.validator(data);

            if (isValid) {
                let foodCategory = await this.dao.save(data);
                let returnData = {
                    id: foodCategory?.id,
                    name: foodCategory?.name,
                };
                return returnData;
            } else {
                let returnData = { message: "Please enter valid data" };
                throw returnData;
            }
        } catch (error: any) {
            throw error;
        }
    }

    async getAllCategories() {
        try {
            let foodCategories = await this.dao.findAll(FoodCategory);
            return foodCategories;
        } catch (error: any) {
            throw error;
        }
    }

    async validator(item: FoodCategory) {
        if ([undefined, null, ""].includes(item.id)) {
            let uid = Date.now();
            item.id = String(uid);
        }
        return true;
    }
}
