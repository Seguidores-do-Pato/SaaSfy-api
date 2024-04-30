import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logging from './config/logging';
import { loggingHandler, routeNotFound } from './middleware';
import { PORT } from './config';

const app = express();

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
app.use(routeNotFound);

const server = http.createServer(app);

server.listen(PORT, () => {
    logging.info('------------------------------------------------------------');
    logging.info(`Server Started on http://localhost:${PORT} 🔥`);
    logging.info('------------------------------------------------------------');
});
