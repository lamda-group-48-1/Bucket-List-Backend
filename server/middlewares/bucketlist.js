import Joi from '@hapi/joi';
import { handleError } from '../utilities';

export const validateCreateList = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    const errorMessage = error.details[0].message;
    handleError(res, errorMessage, 400);
  } else {
    next();
  }
};

export default validateCreateList;
