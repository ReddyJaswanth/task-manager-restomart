import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../entity/Task";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const config = isProduction ? {
    type: "postgres" as const,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Task],
    subscribers: [],
    migrations: [],
    ssl: { rejectUnauthorized: false }
} : {
    type: "sqlite" as const,
    database: process.env.DB_DATABASE || "database.sqlite",
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
    entities: [Task],
    subscribers: [],
    migrations: []
};

export const AppDataSource = new DataSource(config); 