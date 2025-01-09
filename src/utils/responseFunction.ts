export const responseSuccess = (message: string) => {
  return {
    success: true,
    message,
  };
};

export const responseError = (message: string) => {
  return {
    success: false,
    message,
  };
};
