const winston = require('winston')
const logConfiguration = {
  'transports': [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple())
    }),
    new winston.transports.File({
      level: 'debug',
      filename: './logs/api_log.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.ms()

      ),
      expressFormat: true,
    }),
    new winston.transports.File({
      level: 'info',
      filename: './logs/api_log.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.ms()
      ),
      expressFormat: true,
    }),
  ]
}
const logger = winston.createLogger(logConfiguration)
module.exports = logger