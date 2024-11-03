import { ThunkDispatch } from 'redux-thunk';
import {
  LoadingState,
  setLoader,
  setLoaderFalse
} from '../../hooks/Slices/LoaderSlice';
import { Dispatch, UnknownAction } from 'redux';

export const setLoading = async (
  isLoading: boolean,
  data: unknown,
  dispatch: ThunkDispatch<{ loader: LoadingState }, undefined, UnknownAction> &
    Dispatch<UnknownAction>,
  isFetching?: boolean | undefined
) => {
  if (isLoading || isFetching) {
    dispatch(setLoader());
  } else if (data) {
    dispatch(setLoaderFalse());
  }
};
