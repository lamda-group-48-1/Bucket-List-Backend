import { addUser } from '../utilities/db';
import {
  encryptPassword, createToken,
} from '../utilities';
import { handleError, handleResponse } from '../utilities/response';

const signUp = async (req, res) => {
  const { firstName, email, password } = req.formatted;

  const saltRounds = 10;
  try {
    const hash = await encryptPassword(password, saltRounds);

    if (hash) {
      const values = [firstName, email, hash];

      const rows = await addUser(values);

      const { id } = rows[0];
      const token = createToken(id);
      const data = [
        {
          token,
        },
      ];

      handleResponse(res, data, 201);
    }
  } catch (error) {
    const errorMessage = `SERVER ERROR: ${error.message}`;
    handleError(res, errorMessage, 500);
  }
};

export default signUp;
