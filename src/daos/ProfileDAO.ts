import { Repository } from "typeorm";
import { Profile } from "../entities/Profile";
import { AppDataSource } from "../config/Config";

export class ProfileDAO {
    private dao: Repository<Profile>;

    constructor() {
        this.dao = AppDataSource.getRepository(Profile);
    }

    async save(profile: Profile) {
        return await this.dao.save(profile);
    }

    async findOneById(id: string) {
        return await this.dao.findOneBy({ id: id });
    }

    async search(data: any) {
        return await this.dao.createQueryBuilder("profile").orderBy("profile.updatedOn", "DESC").where(data).getMany();
    }

    async delete(data: Profile) {
        return await this.dao.remove([data]);
    }
}
