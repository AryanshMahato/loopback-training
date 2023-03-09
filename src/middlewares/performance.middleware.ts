import {Middleware} from '@loopback/rest';
import {performance} from 'perf_hooks';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';

export const performanceMiddleware: Middleware = async (context, next) => {
  const logger: WinstonLogger = await context.get(
    LoggingBindings.WINSTON_LOGGER,
  );

  const startTime = performance.now();

  try {
    return await next();
  } catch (e) {
    logger.error(e);
    context.response.status(500).json({error: e.toString()});
  } finally {
    const endTime = performance.now();
    logger.info(`Completion time: ${endTime - startTime}`);
  }
};
