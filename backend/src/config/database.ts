import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../entity/Task";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DB_DATABASE || "database.sqlite",
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
    entities: [Task],
    subscribers: [],
    migrations: [],
}); 