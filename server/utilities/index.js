import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const handleError = (res, errorMessage, status = 400) => {
  const error = errorMessage.replace(/"/g, "'");
  res.status(status).json({
    status: 'failed',
    message: error,
  });
};

export const encrypt = async (password, saltRounds, res) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    handleError(res, error.message, 500);
    return null;
  }
};

export const handleResponse = (res, status = 200, data) => {
  res.status(status).json({
    status: 'success',
    data,
  });
};

export const getToken = (payload, expiresIn = '1d') => {
  const token = jwt.sign({ payload }, process.env.SECRET, { expiresIn });
  return token;
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
