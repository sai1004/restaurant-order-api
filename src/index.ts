import { createConnection } from "typeorm";
import * as config from "./config/Config";
import { FoodCategoryController } from "./routes/FoodCategoryController";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();

const port = process.env.PORT || 3500;

const startServer = async () => {
    try {
        let db = await createConnection(config.dbConfig);

        if (db.isConnected) {
            let foodCategoryRoutes = new FoodCategoryController();

            app.use(express.urlencoded({ extended: false }));
            app.use(cors());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(morgan("dev"));

            app.get("/api", (req: any, res: any) => {
                res.send({ message: "Hello App Works!!" });
            });

            app.use("/api/category", foodCategoryRoutes.getRouter());

            app.listen(port, (err: Error) => {
                if (!err) {
                    console.log(`
                    ********************************
                    server is listening on port ${port}
                    ********************************
                    `);
                }
            });
        }
    } catch (error) {
        console.log(`Error: error while starting the server ${error}`);
    }
};

startServer();
