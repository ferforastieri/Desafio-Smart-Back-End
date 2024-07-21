import { DataSource } from "typeorm";
import { Product } from "../entities/product";
import { Cart } from "../entities/cart";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user",
  password: "password",
  database: "resgate_produtos",
  entities: [Product, Cart],
  synchronize: true,
});
