import * as dotenv from 'dotenv';
dotenv.config()

export const ServerConfig={
    port: process.env.PORT || 10000,
    apiUrl: process.env.BASEURL,
}