import { createToken, handleResponse } from '../utilities';

const login = (req, res) => {
  const { user } = req;
  const token = createToken(user.id);
  const data = [{
    token,
  }];

  handleResponse(res, data);
};
export default login;
