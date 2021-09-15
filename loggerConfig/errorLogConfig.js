const winston = require('winston')

const logConfiguration = {
  'transports': [
    new winston.transports.File({
      level: 'error',
      filename: './logs/error_log.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.ms()
      ),
      expressFormat: true,

    })
  ]
}
const logger_err = winston.createLogger(logConfiguration)
module.exports = logger_err