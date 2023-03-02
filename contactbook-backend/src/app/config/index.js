export default {
  app: {
    port: process.env.PORT,
  },
  db: {
    uri: process.env.MONGODB_URL,
  },
};
