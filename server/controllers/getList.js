import { getLists } from '../utilities/db';
import { handleError, handleResponse } from '../utilities';

export const getBucketLists = async (req, res) => {
  try {
    const rows = await getLists([req.userId]);
    handleResponse(res, rows, 200);
  } catch (error) {
    const errorMessage = `SERVER ERROR: ${error.message}`;
    handleError(res, errorMessage, 500);
  }
};

export const getBucketList = async (req, res) => {
  try {
    const rows = await getLists([req.userId], req.params.id);

    if (rows.length) {
      handleResponse(res, rows, 200);
    } else {
      const errorMessage = 'Bucketlist not found';
      handleError(res, errorMessage, 404);
    }
  } catch (error) {
    const errorMessage = `SERVER ERROR: ${error.message}`;
    handleError(res, errorMessage, 500);
  }
};
