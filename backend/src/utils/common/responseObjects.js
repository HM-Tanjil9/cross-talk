export const internalErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    data: {},
    message: 'Internal server error'
  };
};

export const customErrorResponse = (error) => {
  if (!error && !error.explanation) {
    internalErrorResponse(error);
  }
  return {
    success: false,
    err: error.explanation,
    data: {},
    message: error.message
  };
};

export const successResponse = (data, message) => {
  return {
    success: true,
    err: {},
    data: data,
    message: message
  };
};
