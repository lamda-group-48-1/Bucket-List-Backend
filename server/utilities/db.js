import client from '../database';

export const addUser = async (values) => {
  const query = {
    text:
      'INSERT INTO users(first_name, email, password) VALUES($1, $2, $3) RETURNING *',
    values,
  };
  const result = await client.query(query);
  return result.rows;
};

export const getUsers = async (id) => {
  if (id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };
    const result = await client.query(query);
    return result.rows;
  }
  const query = {
    text: 'SELECT * FROM users',
  };
  const result = await client.query(query);
  return result.rows;
};

export const checkUserExist = async (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  const result = await client.query(query);
  return result.rows;
};