import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const run = async () => {
  await initMongoConnection();
  startServer();
};

run();
