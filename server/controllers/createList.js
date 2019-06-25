import { addList } from '../utilities/db';
import { handleError, handleResponse } from '../utilities';

const signUp = async (req, res) => {
  const { title, description } = req.body;

  try {
    const values = [req.userId, title.trim(), description.trim()];
    const rows = await addList(values);
    handleResponse(res, rows, 201);
  } catch (error) {
    const errorMessage = `SERVER ERROR: ${error.message}`;
    handleError(res, errorMessage, 500);
  }
};

export default signUp;
