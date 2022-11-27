import { FoodCategory } from "../entities/FoodCategory";
import { Repository, getRepository } from "typeorm";

export class FoodCategoryDAO {
    private dao: Repository<FoodCategory>;

    constructor() {
        this.dao = getRepository(FoodCategory);
    }

    async save(data: FoodCategory) {
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

    async delete(data: FoodCategory) {
        return await this.dao.remove(data);
    }
}
