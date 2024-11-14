import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from "dotenv";
import { registerAs } from "@nestjs/config";



dotenvConfig({ path: ".env.development" });

const config= {
    type:"postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // autoLoadEntities: true, // esto nose si va o no probar despues 
    synchronize: true, // se corren solas las migraciones si esta en true
    // dropSchema: true,  // borrar todas las tablas
    logging: ["error"],// loggea las queries en la consola 
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.js,.ts}"] 
  }

  export default registerAs("typeorm", () => config);
  export const connectionSource = new DataSource(config as DataSourceOptions)