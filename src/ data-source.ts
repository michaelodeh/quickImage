import { DataSource } from "typeorm";
require("dotenv").config();

const databasePath = process.env.DATABASE_PATH || "database";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: `${databasePath}/database.db`,
  entities: ["out/**/*.entity.js", "out/**/entity.js"],
  migrations: ["migration/*.js"],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log("Database Initialized"))
  .catch((e) => console.log("Database Not Initialised " + e));

export default AppDataSource;
