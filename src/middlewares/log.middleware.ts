import {Middleware} from '@loopback/rest';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';

export const logMiddleware: Middleware = async (context, next) => {
  const logger: WinstonLogger = await context.get(
    LoggingBindings.WINSTON_LOGGER,
  );

  const {headers} = context.request;

  logger.info(`Time: ${new Date().toLocaleString()}`);
  logger.info(`Referer: ${headers['referer']}`);
  logger.info(
    `User Agent: ${headers['user-agent']} Request IP: ${context.request.ip}`,
  );

  return next();
};
