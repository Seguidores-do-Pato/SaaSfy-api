import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logging from './config/logging';
import { loggingHandler, routeNotFound } from './middleware';
import { MONGO_CONNECTION, PORT } from './config';
import mongoose from 'mongoose';
import router from './router';

const app = express();

const main = async () => {
    app.use(
        cors({
            origin: true,
            credentials: true
        })
    );

    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(loggingHandler);
    app.use('/', router());
    app.use(routeNotFound);

    const server = http.createServer(app);

    try {
        const connection = await mongoose.connect(MONGO_CONNECTION);
        logging.log('------------------------------------------------------------');
        logging.log(`Connected to Mongo: ${connection.version} 👌`);
        logging.log('------------------------------------------------------------');
    } catch (error) {
        logging.log('------------------------------------------------------------');
        logging.log('Unable to Connect to Mongo:');
        logging.error(error);
        logging.log('------------------------------------------------------------');
    }

    logging.log('Starting Server...');
    server.listen(PORT, () => {
        logging.log('------------------------------------------------------------');
        logging.log(`Server Started on http://localhost:${PORT} 🔥`);
        logging.log('------------------------------------------------------------');
    });
};

main();
