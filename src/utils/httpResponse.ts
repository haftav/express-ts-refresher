import {HttpError} from './httpError';
import User, {UserResponse} from '../models/User';

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

export const errorResponse = <T>(params: {
  message: string;
  code?: number;
  data?: T;
}): ErrorResponseType<T> => {
  const {message, code, data} = params;
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

export const createErrorResponse = (err: HttpError | Error, statusCode: number) => {
  if (statusCode.toString()[0] === '4') {
    return failureResponse({
      message: err.message,
    });
  } else {
    return errorResponse({
      message: err.message,
      code: statusCode,
    });
  }
};

export const createUserResponse = (user: User): UserResponse => {
  const response = {
    id: user.id,
    username: user.username,
  };

  return response;
};
