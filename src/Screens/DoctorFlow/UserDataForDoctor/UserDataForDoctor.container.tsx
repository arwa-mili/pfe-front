import React, { useEffect, useState } from 'react';
import UserDataForDoctor from './UserDataForDoctor';
import { DoctorsFlowParamList } from '../../../navigation/routes/DoctorFlowStack';
import { DataUser_SCREEN } from '../../../utils/consts/screensNames/ScreensNames';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useLazyGetPatientDataQuery } from '../../../store/apis/chatUserDoctorApis/chatuserDoctorApis';
import { handleGenericError } from '../../../utils/helpers/Errors';
import { setLoading } from '../../../utils/helpers/LoaderDisplay';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { LastdataOfUserResponse } from '../../../interfaces/chatsUserDoctor/DataOfUser';
import { ErrorCode } from '../../../utils/consts/errorCodes/errorCodes';
import { mapErrorResponse } from '../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleChatDoctorError } from './../helper/ChatDoctorPatientErrorHandling';
import { setLoaderFalse } from '../../../hooks/Slices/LoaderSlice';
interface UserDataForDoctorContainerProps
  extends BottomTabScreenProps<DoctorsFlowParamList, typeof DataUser_SCREEN> {}

const UserDataForDoctorContainer: React.FC<
  UserDataForDoctorContainerProps
> = () => {
  const [token, setToken] = useState<string | null>(null);
  const [dataTosend, setDataTosend] = useState<LastdataOfUserResponse | null>(
    null
  );
  const dispatch = useDispatch();

  const [trigger, { data, isFetching, isError, error, isLoading }] =
    useLazyGetPatientDataQuery();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          const route = url.replace(/.*?:\/\//g, '');
          const match = route.match(/reset-password\/reset\/(.*)/);
          if (match) {
            setToken(match[1]);
            if (token !== null) {
              const res = await trigger({ token: token as string }).unwrap();
              dispatch(setLoaderFalse());
              setDataTosend(res);
            }
          }
        }
        // Fetch patient data
      } catch (err) {}
    };

    fetchInitialData();
    dispatch(setLoaderFalse());
  }, [dispatch, token, trigger]);

  useEffect(() => {
    if (data) {
      if (data !== null) {
        dispatch(setLoaderFalse());
        setDataTosend(data);
        console.log(dataTosend);
      }
    }
  }, [data, dataTosend, dispatch]);

  useEffect(() => {
    setLoading(isLoading, data, dispatch, isFetching);
    dispatch(setLoaderFalse());
  }, [isLoading, data, dispatch, isFetching]);

  useEffect(() => {
    if (isError) {
      if (error.data?.errorDetails.statusCode < ErrorCode.INTERNAL_SERVER) {
        const mappederror = mapErrorResponse(error);
        handleChatDoctorError(mappederror, dispatch);
      } else {
        handleGenericError(error, dispatch);
      }
    }
  }, [isError, error, dispatch]);

  return (
    <UserDataForDoctor dataTosend={dataTosend !== null ? dataTosend : null} />
  );
};

export default UserDataForDoctorContainer;
