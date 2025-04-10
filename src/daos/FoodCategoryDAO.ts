import { FoodCategory } from "../entities/FoodCategory";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/Config";

export class FoodCategoryDAO {
    private dao: Repository<FoodCategory>;

    constructor() {
        this.dao = AppDataSource.getRepository(FoodCategory);
    }

    async save(data: FoodCategory) {
        return await this.dao.save(data);
    }

    async findAll(data: any) {
        return await this.dao.find(data);
    }

    async findById(id: any) {
        return await this.dao.findOne(id);
    }

    async delete(data: FoodCategory) {
        return await this.dao.remove(data);
    }
}
