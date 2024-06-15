import { DataSource } from "typeorm";

const SQLiteConn = new DataSource({
  type: "sqlite",
  database: "out/database.db",
  synchronize: true,
  entities: ["out/**/*.entity.js", "out/**/entity.js"],
});

const AppDataSource = SQLiteConn;

AppDataSource.initialize()
  .then(() => console.log("Database Initialized"))
  .catch((e) => console.log("Database Not Initialised " + e));
export default AppDataSource;
