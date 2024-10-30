import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/web3';
import {ServerConfig} from './config/serverConfig';
import cors from "cors";

const router: Express = express();

router.use(cors());

router.use('/', routes);

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

const httpServer = http.createServer(router);
const PORT = ServerConfig.port
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  // Corrected server initialization

