type SuccessResponseType<T> = {
  status: 'success';
  data: T;
};

type FailureResponseType<T> = {
  status: 'failure';
  data: T;
};

type ErrorResponseType<T> = {
  status: 'error';
  message: string;
  code?: number;
  data?: T;
};

export const successResponse = <T>(data: T): SuccessResponseType<T> => {
  const response: SuccessResponseType<T> = {
    status: 'success',
    data,
  };
  return response;
};

export const failureResponse = <T>(data: T): FailureResponseType<T> => {
  const response: FailureResponseType<T> = {
    status: 'failure',
    data,
  };
  return response;
};

export const errorResponse = <T>(
  message: string,
  code?: number,
  data?: T
): ErrorResponseType<T> => {
  const response: ErrorResponseType<T> = {
    status: 'error',
    message,
  };
  if (code) {
    response.code = code;
  }
  if (data) {
    response.data = data;
  }
  return response;
};
