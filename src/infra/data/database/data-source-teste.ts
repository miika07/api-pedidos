import { DataSource } from "typeorm";

export const AppDataSourceTest = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27018,
    username: "fiap",
    password: "password",
    database: "tech-challenge-fiap-test",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: ["./src/core/domain/entities/*.ts"],
    subscribers: [],
    migrations: ["./src/infra/data/database/migrations/*.ts"]
  });