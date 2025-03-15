// Helper function to handle API responses
export const handleResponse = (res, statusCode, data, message = '') => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    data,
    message
  });
};

// Helper function to handle API errors
export const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error'
  });
};

// Helper function to validate request data
export const validateRequest = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    throw {
      statusCode: 400,
      message: error.details[0].message
    };
  }
  return true;
};
