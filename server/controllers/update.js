import { updateList } from '../utilities/db';
import { handleError, handleResponse, handle404 } from '../utilities/response';

const updateBucketList = async (req, res) => {
  const {
    id, title, description, status, imgUrl, journal,
  } = req.body;

  try {
    const values = [title.trim(), description.trim(),
      status, imgUrl && imgUrl.trim(), journal && journal.trim(),
      id, req.userId,
    ];
    const rows = await updateList(values);
    if (rows.length) {
      handleResponse(res, rows, 200);
    } else {
      handle404(res);
    }
  } catch (error) {
    const errorMessage = `SERVER ERROR: ${error.message}`;
    handleError(res, errorMessage, 500);
  }
};

export default updateBucketList;
