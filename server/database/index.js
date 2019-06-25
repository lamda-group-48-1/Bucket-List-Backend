import { Client } from 'pg';
import env from 'dotenv';

env.config();

let client;
const connectDb = () => {
  let connectionString;
  if (process.env.NODE_ENV === 'test') {
    connectionString = process.env.DB_TEST;
    client = new Client({ connectionString });
  } else if (process.env.NODE_ENV === 'production') {
    connectionString = process.env.DATABASE_URL;
    client = new Client({ connectionString, ssl: true });
  } else {
    connectionString = process.env.DB_LOCAL;
    client = new Client({ connectionString });
  }

  client.connect();
  return client;
};

export default client || connectDb();
