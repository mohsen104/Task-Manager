import winston from "winston";

const logger = winston.createLogger({
    level: 'silly',
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({
            filename: 'src/common/logs/app.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
        }),
    ]
})
export default logger;