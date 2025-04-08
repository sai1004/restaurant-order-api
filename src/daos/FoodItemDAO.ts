import { Repository } from "typeorm";
import { FoodItem } from "../entities/FoodItem";
import { AppDataSource } from "../config/Config";

export class FoodItemDAO {
    private dao: Repository<FoodItem>;

    constructor() {
        this.dao = AppDataSource.getRepository(FoodItem);
    }

    async save(foodItem: FoodItem) {
        return await this.dao.save(foodItem);
    }

    async findAll(foodItems: any) {
        return await this.dao.find(foodItems);
    }

    async findById(id: any) {
        return await this.dao.findOneBy({ id: id });
    }

    async delete(data: FoodItem) {
        return await this.dao.remove(data);
    }
}
