import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import MedicalFiles from './MedicalFiles';
import { MEDICALFILES_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { useLazyGetMedicalFilesQuery } from '../../../../store/apis/userProfileApis/userProfileApis';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { MedicalFile } from '../../../../models/MedicalFile';
import { WebView } from 'react-native-webview';
import { isAndroidDevice } from '../../../../utils/helpers/IsAndroidDevice';
interface MedicalFilesContainerProps
  extends NativeStackScreenProps<
    DrawerNavigatorParamList,
    typeof MEDICALFILES_SCREEN
  > {}

const MedicalFilesContainer: React.FC<MedicalFilesContainerProps> = ({
  navigation
}) => {
  const userid = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState<string>('');
  const [refresh, setRefresh] = useState(false);
  const [files, setFiles] = useState<MedicalFile[]>([]);
  const [getMedFiles, { data, isLoading, isFetching, isError, error }] =
    useLazyGetMedicalFilesQuery();

  const fetchData = useCallback(async () => {
    try {
      const result = await getMedFiles({ id: userid as number }).unwrap();
      setFiles(result);
    } catch (err) {
      handleGenericError(err, dispatch);
    }
  }, [getMedFiles, userid, dispatch]);

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

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);

  const [pdff, setPdff] = useState(false);

  const handleLinkPress = (uri: string) => {
    setUrl(uri);
    setPdff(true);
  };

  return pdff === true ? (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: 'http://res.cloudinary.com/thelibrary/image/upload/v1717081675/vtf6ib1fsxodmzmqjgzl.pdf',
        ...(!isAndroidDevice() && {
          headers: { 'Content-Type': 'application/pdf' }
        })
      }}
      style={styles.webview}
    />
  ) : (
    <MedicalFiles
      data={files}
      handlePress={() => navigation.goBack()}
      refreshing={refresh}
      onRefresh={onRefresh}
      handleLinkPress={handleLinkPress}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  webview: {
    flex: 1,
    width: '100%'
  }
});

export default MedicalFilesContainer;
