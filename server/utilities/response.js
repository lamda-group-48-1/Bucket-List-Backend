export const handleResponse = (res, data, status = 200) => {
  res.status(status).json({
    status: 'success',
    data,
  });
};

export const handleError = (res, errorMessage, status = 400) => {
  const error = errorMessage.replace(/"/g, "'");
  res.status(status).json({
    status: 'failed',
    message: error,
  });
};

export const handle404 = (res) => {
  const errorMessage = 'Bucketlist not found';
  handleError(res, errorMessage, 404);
};
