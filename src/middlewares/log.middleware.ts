import {Middleware} from '@loopback/rest';

export const logMiddleware: Middleware = async (context, next) => {
  const {headers} = context.request;

  console.log(
    `Time: ${new Date().toLocaleString()}\nReferer: ${
      headers['referer']
    }, User Agent: ${headers['user-agent']} Request IP: ${context.request.ip}`,
  );

  return next();
};
