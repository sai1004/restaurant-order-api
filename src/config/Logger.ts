import { createLogger, format, transports, Logger as WinstonLogger } from "winston";
import path from "path";

class Logger {
    private static instance: WinstonLogger;

    private constructor() {}

    public static getInstance(): WinstonLogger {
        if (!Logger.instance) {
            Logger.instance = createLogger({
                level: process.env.LOG_LEVEL || "info",
                format: format.combine(
                    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                    format.printf(({ timestamp, level, message }) => {
                        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                    }),
                    format.errors({ stack: true }),
                    format.json()
                ),
                transports: [
                    new transports.Console(),
                    new transports.File({
                        filename: path.join(__dirname, "../logs/error.log"),
                        level: "error",
                    }),
                ],
                exitOnError: false,
            });
        }

        return Logger.instance;
    }
}

export default Logger;
