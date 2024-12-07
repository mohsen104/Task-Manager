import logger from "../configs/logger.js";

const NotFoundHandler = (app) => {
    app.use((req, res) => {
        logger.error("آدرس مورد نظر یافت نشد !");
        res.status(404).json({
            message: "آدرس مورد نظر یافت نشد !",
            method: req.method,
            url: req.originalUrl
        });
    });
};

export default NotFoundHandler;