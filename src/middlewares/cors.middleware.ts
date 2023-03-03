import {Middleware} from '@loopback/rest';

export const corsMiddleware: Middleware = async (context, next) => {
  const {headers} = context.request;
  const allowedOrigins = process.env.ALLOWED_ORIGINS ?? '';

  if (!headers['referer'] || !allowedOrigins.includes(headers['referer'])) {
    context.response.status(403).json({error: 'Referer did not matched'});
  }

  await next();
};
