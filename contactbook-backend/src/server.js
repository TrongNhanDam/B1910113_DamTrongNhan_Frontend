import app from "./app";

import config from "./app/config/index";

import MongoDB from "./app/utils/mongodb.util";

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the database!");
    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} - http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit(1);
  }
}
startServer();
