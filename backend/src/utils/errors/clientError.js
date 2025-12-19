import { StatusCodes } from 'http-status-codes';

class ClientError extends Error {
  constructor(error) {
    super(error.message);
    this.name = 'ClientError';
    this.message = error.message;
    this.statusCode = error.statusCode
      ? error.statusCode
      : StatusCodes.BAD_REQUEST;
    this.explanation = error.explanation;
  }
}

export default ClientError;
