import React, { useEffect, useCallback } from 'react';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import HealthTrackers from './HealthTrackers';
import {
  HEALTHTRACKERS_SCREEN,
  MeasuresHistory_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { useLazyGetUserTotalMeasuresForchartQuery } from '../../../../store/apis/measuresApis/measuresApis';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { Text } from 'react-native';

interface HealthTrackersContainerProps
  extends NativeStackScreenProps<
    DrawerNavigatorParamList,
    typeof HEALTHTRACKERS_SCREEN
  > {}

const HealthTrackersContainer: React.FC<HealthTrackersContainerProps> = ({
  navigation
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const userid = useAppSelector((state) => state.user.id);
  const [fetch, { data, isLoading, isFetching, isError, error }] =
    useLazyGetUserTotalMeasuresForchartQuery();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch({ userid: userid as number }).unwrap();
      console.log(res);
    } catch (error) {
      dispatch(setLoaderFalse());
      handleGenericError(error, dispatch);
    }
  }, [dispatch, fetch, userid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setLoading(isLoading, data, dispatch, isFetching);

    if (isError) {
      dispatch(setLoaderFalse());
      handleGenericError(error, dispatch);
    }
  }, [isLoading, data, isFetching, isError, error, dispatch]);

  const navigateToMeasureTablePage = () => {
    navigation.navigate(MeasuresHistory_SCREEN);
  };

  return data && data.length > 0 ? (
    <HealthTrackers
      data={data}
      navigateToMeasureTablePage={navigateToMeasureTablePage}
    />
  ) : (
    <Text>No data to show</Text>
  );
};

export default HealthTrackersContainer;
