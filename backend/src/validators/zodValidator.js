import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/common/responseObjects.js';
import z from 'zod';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log('zod validator error', error);
      let explanation = [];
      let errorMessage = '';
      if (error instanceof z.ZodError) {
        // error.issues;
        error.issues.forEach((key) => {
          explanation.push(key.message);
          errorMessage += ` ${key.path[0]} : ${key.message},`;
        });
      }

      // error.forEach((key) => {
      //   explanation.push(key.message);
      // });
      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation error' + errorMessage,
          explanation: explanation
        })
      );
    }
  };
};
