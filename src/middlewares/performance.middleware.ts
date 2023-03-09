import {Middleware} from '@loopback/rest';
import {performance} from 'perf_hooks';

export const performanceMiddleware: Middleware = async (context, next) => {
  const startTime = performance.now();

  try {
    return await next();
  } catch (e) {
    console.error(e);
    context.response.status(500).json({error: e.toString()});
  } finally {
    const endTime = performance.now();
    console.log(`Completion time: ${endTime - startTime}`);
  }
};
