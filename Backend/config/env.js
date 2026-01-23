import {config} from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || 'dev'}.local` });


export const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    PORT,
} = process.env;