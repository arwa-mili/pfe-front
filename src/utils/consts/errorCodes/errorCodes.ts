export const ErrorCode = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER: 500,
  UNAVAILABLE_SERVICE: 503,
  FETCH_ERROR: 508,
  PARSING_ERROR: 504,
  Undefined_ERROR: 509,
  UNPROCESSABLE_ENTITY: 422

  //{"error": "TypeError: Network request failed", "status": "FETCH_ERROR"}

  //{"data": "PROXY_TO_SERVER_REQUEST_ERROR: Error: connect ETIMEDOUT 125.51.0.2:3000", "error": "SyntaxError: JSON Parse error: Unexpected character: P", "originalStatus": 504, "status": "PARSING_ERROR"}
};
