import { FoodItemDAO } from "../daos/FoodItemDAO";
import { FoodItem } from "../entities/FoodItem";
import { Props } from "../utils/Props";

export class FoodItemService {
    private dao: FoodItemDAO;

    constructor() {
        this.dao = new FoodItemDAO();
    }

    async save(data: FoodItem) {
        try {
            let isValid: boolean = await this.validator(data);

            if (isValid) {
                await this.dao.save(data);
                let returnData = {
                    id: data?.id,
                    name: data?.name,
                };
                return returnData;
            } else {
                const returnData = { message: "Please enter valid data" };
                throw returnData;
            }
        } catch (error: any) {
            throw error;
        }
    }

    async getAllItem(item: FoodItem) {
        try {
            let foodItems = await this.dao.findAll(item);
            return foodItems;
        } catch (error: any) {
            throw error;
        }
    }

    async getItemById(id: string) {
        try {
            let foodItem = await this.dao.findById(id);
            return foodItem;
        } catch (error: any) {
            throw error;
        }
    }

    async validator(item: FoodItem) {
        if (!item.id || item.id == "" || item.id == "0") {
            let uid = Date.now();
            item.id = String(uid);
        }
        return true;
    }
}
