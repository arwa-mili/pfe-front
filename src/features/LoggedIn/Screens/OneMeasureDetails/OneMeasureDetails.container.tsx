import * as React from 'react';
import OneMeasureDetails from './OneMeasureDetails';
import Header from '../../../UserInfos/Components/Header/Header';
import { stylesGlobal } from '../../Utils/styling/globalStyles';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { ONEMEASUREDETAILS_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { handleAddMeasureHistoryError } from './helper/AddMeasureHistoryErrorHandling';
import { showMessageModal } from '../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../locales/translation.config';
import { MODAL_BUTTONS_TEXTS } from '../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';
import { MessageTypes } from '../../../../enums/MessageTypes';
import { useAddMeasureToHistoryMutation } from '../../../../store/apis/measuresApis/measuresApis';

type OneMeasureDetailsProps = DrawerScreenProps<
  DrawerNavigatorParamList,
  typeof ONEMEASUREDETAILS_SCREEN
>;

const OneMeasureDetailsContainer: React.FC<OneMeasureDetailsProps> = ({
  route
}) => {
  const measure_id = route.params.measure_id;
  const [isVisible, setIsVisible] = useState(false);
  const userId = useAppSelector((state) => state.user?.id);
  const [loading, setLoading] = useState<boolean>(false);
  const [measureHistoryAdd] = useAddMeasureToHistoryMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = async (newMeasure: number) => {
    try {
      const addMeasuretoHistoryDTO = {
        specification: route.params.specification,
        value: newMeasure
      };
      setLoading(true);
      if (userId != null && measure_id != null) {
        await measureHistoryAdd({
          userid: userId,
          mesid: measure_id,
          addMeasuretoHistoryDTO
        }).unwrap();
        dispatch(
          showMessageModal({
            headerText: tt('Saved successfully'),
            messageText: tt('value is added successfully'),
            buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
            messageType: MessageTypes.SUCCESS,
            onProceed: () => {
              setIsVisible(false);
            }
          })
        );
      }
    } catch (error) {
      if (isErrorInterface(error) && error.status < ErrorCode.INTERNAL_SERVER) {
        const mappederror = mapErrorResponse(error);
        await handleAddMeasureHistoryError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    } finally {
      setIsVisible(false);
      setLoading(false);
      dispatch(setLoaderFalse());
    }
  };

  const handleAddNew = async () => {
    await setIsVisible(true);
  };
  return (
    <>
      <Header
        textStyle={stylesGlobal.HeaderText}
        title={'MeasureDetails'}
        medium={false}
      />

      <OneMeasureDetails
        isVisible={isVisible}
        iconColor={route.params.iconColor}
        iconName={route.params.iconName}
        measure={route.params.measure}
        name={route.params.name}
        addNew={handleAddNew}
        setIsVisibleFalse={() => setIsVisible(false)}
        measure_id={measure_id}
        max={route.params.max}
        min={route.params.min}
        limitInf={route.params.limitInf}
        limitSup={route.params.limitSup}
        handleSubmit={handleSubmit}
        unit={route.params.unit}
        lastMeasured={route.params.lastMeasured}
        loading={loading}
        specification={route.params.specification}
      />
    </>
  );
};

export default OneMeasureDetailsContainer;
