const Joi = require('joi');

exports.addSchoolSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
    'any.required': 'Address is required',
  }),
  latitude: Joi.number().min(-90).max(90).required().messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be greater than or equal to -90',
    'number.max': 'Latitude must be less than or equal to 90',
    'any.required': 'Latitude is required',
  }),
  longitude: Joi.number().min(-180).max(180).required().messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be greater than or equal to -180',
    'number.max': 'Longitude must be less than or equal to 180',
    'any.required': 'Longitude is required',
  }),
}).unknown(false);

exports.listSchoolsSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required().messages({
    'number.base': 'Latitude must be a number',
    'number.min': 'Latitude must be greater than or equal to -90',
    'number.max': 'Latitude must be less than or equal to 90',
    'any.required': 'Latitude is required',
  }),
  longitude: Joi.number().min(-180).max(180).required().messages({
    'number.base': 'Longitude must be a number',
    'number.min': 'Longitude must be greater than or equal to -180',
    'number.max': 'Longitude must be less than or equal to 180',
    'any.required': 'Longitude is required',
  }),
}).unknown(false);
