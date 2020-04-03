export interface ErrorObject {
  statusCode: number;
  error: string;
  message: string;
}

export function handleErrors(errorObject: ErrorObject) {
  const { statusCode, error, message } = errorObject;
}