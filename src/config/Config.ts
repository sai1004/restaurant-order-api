import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    name: "default",
    type: "mysql",
    host: process.env.DB_HOST || "mysql",  // Default to service name
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "Admin!23",
    database: process.env.DB_NAME || "food_order_db",
    logging: true,
    synchronize: false,
    entities: [__dirname + "/../entities/**/*{.ts,.js}"],
});