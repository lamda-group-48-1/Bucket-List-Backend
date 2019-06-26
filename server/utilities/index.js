import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const encryptPassword = async (password, saltRounds) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const decryptPassword = async (password, dbPassword) => {
  const result = await bcrypt.compare(password, dbPassword);
  return result;
};

export const createToken = (payload, expiresIn = '1d') => {
  const token = jwt.sign({ payload }, process.env.SECRET, { expiresIn });
  return token;
};

export const getPayload = async (token) => {
  const payload = await jwt.verify(token, process.env.SECRET);
  return payload;
};

export const toLowerCaseAndTrim = (inputObject) => {
  const formattedObject = {};
  Object.entries(inputObject).forEach((element) => {
    const key = element[0];
    const value = element[1];
    formattedObject[key] = value.replace(/\s/g, '').toLowerCase();
  });
  return formattedObject;
};
