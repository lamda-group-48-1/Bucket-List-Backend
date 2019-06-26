import { getLists } from '../utilities/db';
import { handleError, handleResponse } from '../utilities';

const getBucketLists = async (req, res) => {
  try {
    const rows = await getLists([req.userId]);
    handleResponse(res, rows, 200);
  } catch (error) {
    const errorMessage = `SERVER ERROR: ${error.message}`;
    handleError(res, errorMessage, 500);
  }
};
export default getBucketLists;
