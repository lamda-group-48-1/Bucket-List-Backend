import db from './index';

const sql = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS bucket_list CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(128) NULL,
  last_name VARCHAR(128) NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(256) NOT NULL,
  status VARCHAR(128) NULL
);

CREATE TABLE IF NOT EXISTS bucket_list (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(128) NULL,
  description VARCHAR(256) NULL,
  img_url VARCHAR(128) NULL,
  journal TEXT NULL,
  status BOOLEAN NULL
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
