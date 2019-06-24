import Joi from '@hapi/joi';
import { handleError, toLowerCaseAndTrim, decrypt } from '../utilities';
import { checkUserExist } from '../utilities/db';

export const signup = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    firstName: Joi.string().required(),
    password: Joi.string().required(),
    rePassword: Joi.string().required(),
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    const errorMessage = error.details[0].message;
    handleError(res, errorMessage, 400);
  } else {
    const formatted = toLowerCaseAndTrim(req.body);
    const { email, firstName } = formatted;
    const { password, rePassword } = req.body;

    try {
      const users = await checkUserExist(email);

      if (password !== rePassword) {
        const errorMessage = 'Password does not match';
        handleError(res, errorMessage, 400);
      } else if (users.length > 0) {
        const errorMessage = 'User with this email exist';
        handleError(res, errorMessage, 409);
      } else {
        req.formatted = {
          email,
          firstName,
          password,
          rePassword,
        };
        next();
      }
    } catch (err) {
      const errorMessage = `SERVER ERROR: ${err.message}`;
      handleError(res, errorMessage, 500);
    }
  }
};

export const login = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string().required(),
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    const errorMessage = error.details[0].message;
    handleError(res, errorMessage, 400);
  } else {
    const formatted = toLowerCaseAndTrim(req.body);
    const { email } = formatted;
    const { password } = req.body;

    try {
      const [user] = await checkUserExist(email);
      if (user) {
        const response = await decrypt(password, user.password);
        if (response) {
          req.user = user;
          next();
        } else {
          const errorMessage = 'Unauthorized: Invalid Credentials';
          handleError(res, errorMessage, 401);
        }
      } else {
        const errorMessage = 'Unauthorized: Invalid Credentials';
        handleError(res, errorMessage, 401);
      }
    } catch (err) {
      const errorMessage = `SERVER ERROR: ${err.message}`;
      handleError(res, errorMessage, 500);
    }
  }
};

export default signup;
