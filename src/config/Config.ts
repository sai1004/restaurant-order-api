import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Admin!23",
    database: "food_order_db",
    logging: true,
    synchronize: false,
    entities: [__dirname + "/../entities/**/*{.ts,.js}"],
});