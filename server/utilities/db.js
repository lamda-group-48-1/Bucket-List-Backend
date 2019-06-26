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

export const addList = async (values) => {
  const query = {
    text:
      `INSERT INTO bucket_list(user_id, title, description, status)
       VALUES($1, $2, $3, $4) RETURNING *`,
    values: [...values, false],
  };
  const result = await client.query(query);
  return result.rows;
};

export const updateList = async (values) => {
  const query = {
    text:
      `UPDATE bucket_list set title=$1, description=$2, status=$3, img_url=$4, journal=$5
       WHERE id=$6 and user_id=$7 RETURNING *`,
    values,
  };
  const result = await client.query(query);
  return result.rows;
};

export const getLists = async (values) => {
  const query = {
    text:
      'SELECT * FROM bucket_list WHERE user_id=$1',
    values,
  };
  const result = await client.query(query);
  return result.rows;
};
