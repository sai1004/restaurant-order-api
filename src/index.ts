import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import * as Config from "./config/Config";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;
const swaggerDocument = YAML.load("./swagger.yaml");
import { Request, Response, NextFunction } from "express";
import { Server } from "http";
import { DataSource } from "typeorm";

const startServer = async () => {
    try {
        const dataSource: DataSource = await Config.AppDataSource.initialize();

        if (dataSource) {
            app.use(express.json());
            app.use(express.urlencoded({ extended: false }));
            app.use(cors());
            app.use(logger("dev"));

            app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

            app.get("/api", (req: Request, res: Response) => {
                res.json({ message: "Hello App Works!!" });
            });

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
    } catch (error) {
        console.error("❌ Error starting the server:", error);
    }
};

startServer();