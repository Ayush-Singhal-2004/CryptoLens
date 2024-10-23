import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/web3';

const router: Express = express();

router.use('/', routes);

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

const httpServer = http.createServer(router);
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  // Corrected server initialization

