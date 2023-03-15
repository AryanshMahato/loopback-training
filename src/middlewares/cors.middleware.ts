import {Middleware} from '@loopback/rest';

export const corsMiddleware: Middleware = async (context, next) => {
  const {headers} = context.request;
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  if (allowedOrigins === '*') {
    return next();
  }

  const referer = headers['referer'];
  if (!referer) {
    return context.response.status(403).json({error: 'Referer not found'});
  }

  if (!allowedOrigins) {
    return context.response.status(500).json({error: 'Referer not configured'});
  }

  if (!allowedOrigins.includes(referer)) {
    return context.response
      .status(403)
      .json({error: 'Referer did not matched'});
  }

  return next();
};
