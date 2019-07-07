import Joi from '@hapi/joi';
import { handleError } from '../utilities/response';

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

export const validateUpdateList = async (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    imgUrl: Joi.string(),
    journal: Joi.string(),
    status: Joi.boolean().required(),
  });

  const { error } = Joi.validate(req.body, schema);

  if (error) {
    const errorMessage = error.details[0].message;
    return handleError(res, errorMessage, 400);
  }
  return next();
};

export const validateParamsId = async (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.number().required(),
  });

  const { error } = Joi.validate(req.params, schema);

  if (error) {
    const errorMessage = error.details[0].message;
    return handleError(res, errorMessage, 400);
  }
  return next();
};

export default validateCreateList;
