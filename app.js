import express from 'express';
import NotFoundHandler from './src/common/exceptions/not-found.handler.js';
import AllExceptionHandler from './src/common/exceptions/all-exception.handler.js';
import AllRoutes from './src/app.routes.js';
import './src/common/configs/sequelize.config.js';
import logger from './src/common/configs/logger.js';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    logger.info(`${req.method}: ${req.path}`)
    next();
})

app.use("/api", AllRoutes);

NotFoundHandler(app);

AllExceptionHandler(app);

app.listen(port, () => {
    console.log(`server run on port : ${port}`);
});