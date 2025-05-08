import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import * as Config from "./config/Config";
import helmet from "helmet";
import { Request, Response } from "express";
import { Server } from "http";
import { DataSource } from "typeorm";

const app = express();
const PORT = process.env.PORT || 3500;
const swaggerDocument = YAML.load("./swagger.yaml");

import { FoodItemController } from "./controllers/FoodItemController";
import { FoodCategoryController } from "./controllers/FoodCategoryController";
import { AuthController } from "./controllers/AuthController";

const startServer = async () => {
    try {
        const dataSource: DataSource = await Config.AppDataSource.initialize();

        if (dataSource) {
            const foodItemRouter = new FoodItemController();
            const foodCategoryRouter = new FoodCategoryController();
            const authControllerRouter = new AuthController();

            app.use(express.json());
            app.use(express.urlencoded({ extended: false }));

            app.use(
                helmet({
                    contentSecurityPolicy: { // CSP
                        directives: {
                            defaultSrc: ["'none'"],
                            imgSrc: ["'self'"],
                            scriptSrc: ["'self'"],
                            styleSrc: ["'self'"],
                            objectSrc: ["'none'"],
                        },
                    },
                    frameguard: { action: "sameorigin" }, // x-frame-options
                    hsts: {
                        maxAge: 63072000, // 2 years in seconds
                        includeSubDomains: true,
                        preload: true,
                    },
                    xssFilter: true,
                    noSniff: true,
                    referrerPolicy: { policy: "no-referrer" }, // safer alternative
                })
            );

            app.use(
                cors({
                    origin: "*",
                    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
                    allowedHeaders: "*",
                })
            );
            app.use(logger("common"));

            let options = {
                swaggerOptions: {
                    tagsSorter: "alpha",
                }
            };

            app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

            app.get("/api", (req: Request, res: Response) => {
                res.json({ message: "Hello App Works!!" });
            });

            app.use("/api/food", foodItemRouter.getRouter());
            app.use("/api/food", foodCategoryRouter.getRouter());
            app.use("/api/auth", authControllerRouter.getRouter());

            const server: Server = app.listen(PORT, () => {
                console.log(`🚀 Server running at http://localhost:${PORT}/api`);
                console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
            });

            // Graceful shutdown
            const shutdown = async () => {
                console.log("🔻 Shutting down server...");
                server.close(() => {
                    console.log("✅ HTTP server closed");
                    process.exit(0);
                });
            };

            process.on("unhandledRejection", (reason) => {
                console.error("Unhandled Rejection:", reason);
                shutdown();
            });

            process.on("uncaughtException", (err) => {
                console.error("Uncaught Exception:", err);
                shutdown();
            });
        }
    } catch (error: any) {
        console.error("❌ Error starting the server:", error);
    }
};

startServer();