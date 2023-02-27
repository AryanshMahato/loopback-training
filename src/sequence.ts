import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import {performance} from 'perf_hooks';

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext): Promise<void> {
    const {headers} = context.request;

    console.log(
      `Time: ${new Date().toISOString()}\nReferer: ${
        headers['referer']
      }, User Agent: ${headers['user-agent']} Request IP: ${
        context.request.ip
      }`,
    );

    const startTime = performance.now();

    try {
      const allowedOrigins = process.env.ALLOWED_ORIGINS ?? '';

      if (!headers['referer'] || !allowedOrigins.includes(headers['referer'])) {
        throw new Error('Origin not allowed');
      }

      await super.handle(context);

      const endTime = performance.now();

      console.log(`Completion time : ${endTime - startTime} ms`);
    } catch (e) {
      const endTime = performance.now();

      console.log(`Error time: ${endTime - startTime}`);
      console.error(e);
      context.response.status(500).json({error: e.toString()});
    }
  }
}
