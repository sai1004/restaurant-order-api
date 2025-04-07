import { FoodItemDAO } from "../daos/FoodItemDAO";
import { FoodItem } from "../entities/FoodItem";
import { v4 as uuidv4 } from "uuid";

export class FoodItemService {
    private dao: FoodItemDAO;

    constructor() {
        this.dao = new FoodItemDAO();
    }

    async save(data: FoodItem) {
        try {
            let isValid = await this.validator(data);

            if (isValid) {
                let foodItemData = this.dao.save(data);
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

    async getItems(items: FoodItem) {
        try {
            let foodItemData = await this.dao.findAll(items);
            return foodItemData;
        } catch (error) {
            throw error;
        }
    }

    async getItemsById(id: string) {
        try {
            let foodItemData = await this.dao.findById(id);
            return foodItemData;
        } catch (error) {
            throw error;
        }
    }

    async validator(item: FoodItem) {
        if (!item.id || item.id == "" || item.id == "0") {
            let uid = uuidv4();
            item.id = uid;
        }
        return true;
    }
}
