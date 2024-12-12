import express from 'express';
import NotFoundHandler from './src/common/exceptions/not-found.handler.js';
import AllExceptionHandler from './src/common/exceptions/all-exception.handler.js';
import AllRoutes from './src/app.routes.js';
import './src/common/configs/sequelize.config.js';
import logger from './src/common/configs/logger.js';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { redisClient, redisConfig } from './src/common/configs/redis.config.js';
import CreatePermissions from './src/common/configs/permissions.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
const sessionSecretKey = process.env.SESSION_SECRET_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: "session-id",
    store: new RedisStore({ client: redisClient }),
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax",
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
    },
}));

redisConfig();

app.use((req, res, next) => {
    logger.info(`${req.method}: ${req.path}`)
    next();
});

CreatePermissions();

app.use("/api", AllRoutes);

NotFoundHandler(app);

AllExceptionHandler(app);

app.listen(port, () => {
    console.log(`server run on port : ${port}`);
});