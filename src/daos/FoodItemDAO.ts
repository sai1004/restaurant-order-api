import { getRepository, Repository } from "typeorm";
import { FoodItem } from "../entities/FoodItem";

export class FoodItemDAO {
    private dao: Repository<FoodItem>;

    constructor() {
        this.dao = getRepository(FoodItem);
    }

    async save(data: FoodItem) {
        return await this.dao.save(data);
    }

    async findAll(data: any) {
        return await this.dao.find(data);
    }

    async findOne(data: any) {
        return await this.dao.findOne(data);
    }

    async findById(id: any) {
        return await this.dao.findOne(id);
    }

    async delete(data: FoodItem) {
        return await this.dao.remove(data);
    }
}
