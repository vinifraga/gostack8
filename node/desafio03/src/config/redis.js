const { REDIS_HOST, REDIS_PORT } = process.env;

export default {
  host: REDIS_HOST,
  port: REDIS_PORT,
};
