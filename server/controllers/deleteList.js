import { deleteList } from '../utilities/db';
import { handleError, handleResponse, handle404 } from '../utilities/response';

const deleteBucketList = async (req, res) => {
  try {
    const values = [req.userId, req.params.id];
    const rows = await deleteList(values);
    if (rows.length) {
      handleResponse(res, rows, 201);
    } else {
      handle404(res);
    }
  } catch (error) {
    const errorMessage = `SERVER ERROR: ${error.message}`;
    handleError(res, errorMessage, 500);
  }
};

export default deleteBucketList;
