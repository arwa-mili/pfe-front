import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import {
  ErrorServerInterface,
  IErrorClient
} from '../../models/ErrorInterfaces/ErrorInterfaces.interface';

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return error != null && typeof error === 'object' && 'status' in error;
}

export const isNetworkError = (error: unknown): boolean => {
  return (
    error != null &&
    typeof error === 'object' &&
    'error' in error &&
    error?.error?.toString() === 'TypeError: Network request failed'
  );
};

export function isIErrorClient(error: unknown): error is IErrorClient {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error &&
    typeof error.status === 'number' &&
    typeof error.message === 'string'
  );
}

export function isErrorInterface(
  error: unknown
): error is ErrorServerInterface {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    'error' in (error as any).data &&
    typeof (error as any).data.error === 'boolean' &&
    'errorDetails' in (error as any).data &&
    typeof (error as any).data.errorDetails === 'object' &&
    'error' in (error as any).data.errorDetails &&
    typeof (error as any).data.errorDetails.error === 'string' &&
    'message' in (error as any).data.errorDetails &&
    typeof (error as any).data.errorDetails.message === 'string' &&
    'statusCode' in (error as any).data.errorDetails &&
    typeof (error as any).data.errorDetails.statusCode === 'number' &&
    'status' in error &&
    typeof (error as any).status === 'number'
  );
}
