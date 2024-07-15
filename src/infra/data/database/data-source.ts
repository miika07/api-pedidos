import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    // host: "mongodb",
    port: 27017,
    username: "fiap",
    password: "password",
    database: "tech-challenge-fiap",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: true,
    entities: ["./src/core/domain/entities/*.ts"],
    subscribers: [],
    migrations: ["./src/infra/data/database/migrations/*.ts"]
  });