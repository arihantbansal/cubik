export type ErrorResponse = {
  code: number;
  error: string;
  data: null;
};

export type ErrorResponseWithData<T> = {
  code: number;
  error: string;
  data: T;
};

export type SuccessResponse<T> = {
  code: number;
  error: '';
  data: T;
};

export type ApiResponse<T> =
  | SuccessResponse<T>
  | ErrorResponse
  | ErrorResponseWithData<T>;

export function createFailureResponse(
  code: number,
  error: string,
): ErrorResponse {
  const response: ErrorResponse = {
    code: code,
    error: error,
    data: null,
  };
  return response;
}

export function createFailureResponseData<T>(
  code: number,
  error: string,
  data: T,
): ErrorResponseWithData<T> {
  const response: ErrorResponseWithData<T> = {
    code: code,
    data: data,
    error: error,
  };
  return response;
}

export function createSuccessResponse<T>(
  code: number,
  data: T,
): SuccessResponse<T> {
  const response: SuccessResponse<T> = {
    code: code,
    data: data,
    error: '',
  };
  return response;
}
