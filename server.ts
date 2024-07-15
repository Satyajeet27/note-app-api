import app from "./src/app";
import config from "./src/config/config";
import connectDb from "./src/config/db";

const startServer = async () => {
  const port = config.port;
  const uri = config.uri as string;
  await connectDb(uri);
  app.listen(port, () => {
    console.log("Server has been started and listening to port ", port);
  });
};
startServer();
