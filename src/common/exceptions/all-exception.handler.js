import logger from "../configs/logger.js";

const AllExceptionHandler = (app) => {
    app.use((err, req, res, next) => {
        let status = err?.status ?? err?.statusCode ?? err?.code;

        if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;

        const message = err?.cause?.sqlMessage ?? err?.message ?? err?.stack ?? "خطای سرور داخلی";

        logger.error(message);

        res.status(status).json({ message });
    });
};

export default AllExceptionHandler;
