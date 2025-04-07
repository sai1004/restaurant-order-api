import { FoodCategoryDAO } from "../daos/FoodCategoryDAO";
import { FoodCategory } from "../entities/FoodCategory";
import { v4 as uuidv4 } from "uuid";

export class FoodCategoryService {
    private dao: FoodCategoryDAO;

    constructor() {
        this.dao = new FoodCategoryDAO();
    }

    async save(data: FoodCategory) {
        try {
            let isValid = await this.validator(data);

            if (isValid) {
                let foodCategoryData = this.dao.save(data);
                let returnData = {
                    id: data.id,
                    name: data.name,
                    message: "Saved Successfully!!",
                };
                return returnData;
            } else {
                let returnData = { message: "Please enter valid data" };
                throw returnData;
            }
        } catch (error) {
            throw error;
        }
    }

    async validator(item: FoodCategory) {
        if (!item.id || item.id == "" || item.id == "0") {
            let uid = uuidv4();
            item.id = uid;
        }
        return true;
    }
}