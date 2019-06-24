import db from './index';

const sql = `
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(128) NULL,
  last_name VARCHAR(128) NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(256) NOT NULL,
  status VARCHAR(128) NULL
);
`;

const createTable = async () => {
  try {
    await db.query(sql);
    db.end();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
createTable();
