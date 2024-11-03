export interface ErrorServerInterface {
  data: {
    error: boolean;
    errorDetails: {
      error: string;
      message: string;
      statusCode: number;
    };
    stack: string;
  };
  status: number;
}

export interface IErrorClient {
  status: number;
  message: string;
}

export function mapErrorResponse(error: ErrorServerInterface): IErrorClient {
  const errorMessage = error.data.errorDetails.message;

  return {
    status: error.data.errorDetails.statusCode,
    message: errorMessage
  };
}
