import React, { useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { stylesSplash } from './splashStyles';
import { Jsons } from '../../../../utils/StylingConsts/Json/Json';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setDiseasesSchedules } from '../../../../hooks/Slices/UserDiseasesScheduleSlice';
import { onLoginFalse } from '../../../../hooks/Slices/UserSlice';
import {
  logoutMeasures,
  setMeasures
} from '../../../../hooks/Slices/MeasuresLaboSlice';
import {
  useLazyFindLaboMeasuresQuery,
  useLazyGetUserDiseasesAndSchedulesQuery
} from '../../../../store/apis/measuresApis/measuresApis';
import { setLoader } from '../../../../hooks/Slices/LoaderSlice';
import { scheduleNotifications } from '../../../../utils/helpers/notifications/measuresNotifications';
import { loadSplash } from '../../../../hooks/Slices/AuthSlice';

const Splash: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const sp = useAppSelector((state) => state.auth.loadSplash);
  const laboMes = useAppSelector((state) => state.mesureLabo.measuresLabo);
  const [getMeasures] = useLazyFindLaboMeasuresQuery();
  const [getSchedules] = useLazyGetUserDiseasesAndSchedulesQuery();

  useEffect(() => {
    if (sp === true) {
      const fetchMeasuresAndSchedules = async () => {
        try {
          let MeasuresData, isLoadingMeasures, Disdata, isLoadingSchedules;
          dispatch(logoutMeasures());

          if (laboMes === null) {
            ({ isLoading: isLoadingMeasures, data: MeasuresData } =
              await getMeasures({
                measureCriteriaDto: { measureType: 'Laboratory' }
              }));
            if (isLoadingMeasures) {
              setLoader();
            }

            if (!isLoadingMeasures && MeasuresData !== undefined) {
              dispatch(setMeasures(MeasuresData));
            }
          }

          // Check if Disdata is undefined before querying

          ({ isLoading: isLoadingSchedules, data: Disdata } =
            await getSchedules({
              userid: user.id as number
            }));

          if (!isLoadingSchedules && Disdata !== undefined) {
            console.log('ggo');
            console.log(Disdata);
            dispatch(setDiseasesSchedules(Disdata));
            scheduleNotifications(Disdata);
          }
        } catch (error) {
        } finally {
          dispatch(loadSplash({ loadSplash: false }));
          dispatch(onLoginFalse());
        }
      };

      fetchMeasuresAndSchedules();
    }
  }, [sp, getMeasures, getSchedules, dispatch, user.id, laboMes]);

  return (
    <View style={stylesSplash.mainContent}>
      <LottieView
        style={stylesSplash.lottieViewStyle}
        source={Jsons.splashScreen}
        autoPlay={true}
        loop={true}
        resizeMode="cover"
        speed={0.7}
      />
    </View>
  );
};

export default Splash;
