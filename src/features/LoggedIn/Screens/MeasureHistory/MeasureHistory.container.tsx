import React, { useState } from 'react';
import MeasureHistory from './MeasureHistory';
import { MessageTypes } from '../../../../enums/MessageTypes';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { showMessageModal } from '../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../locales/translation.config';
import {
  MODAL_BUTTONS_TEXTS,
  MODAL_HEADERS_MESSAGES
} from '../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';

import { MeasureHistoryData } from '../../Interfaces/MeasureHistoryData/MeasureHistoryData.interface';
import { setMeasureHistoryForCurrentUser } from '../../../../hooks/Slices/MeasureHistorySlice';
import {
  setLoader,
  setLoaderFalse
} from '../../../../hooks/Slices/LoaderSlice';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import {
  useDeleteMeasureHistoryMutation,
  useGetMeasureHistoryOfUserQuery
} from '../../../../store/apis/measuresApis/measuresApis';

const MeasureHistoryContainer: React.FC = (): JSX.Element => {
  const [deleteMeasureHistory] = useDeleteMeasureHistoryMutation();
  const [index, setIndex] = useState<number>(0);
  const [, setSelectedRowIndex] = useState(-1);
  let mesArray: MeasureHistoryData[] = [];
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    data: Mesdata,
    isLoading,
    isFetching,
    error,
    isError
  } = useGetMeasureHistoryOfUserQuery({ userid: user?.id as number });

  if (isLoading || isFetching) {
    dispatch(setLoader());
  }
  if (isError) {
    dispatch(setLoaderFalse());
    if (isErrorInterface(error) && error.status !== ErrorCode.UNAUTHORIZED) {
      mapErrorResponse(error);
      //handle specifif error if existing
    } else {
      handleGenericError(error, dispatch);
    }
  }
  if (Mesdata !== undefined) {
    dispatch(setMeasureHistoryForCurrentUser(Mesdata));
    dispatch(setLoaderFalse());
  }
  const measures = useAppSelector((state) => state.mesureHistory.measures);
  if (measures !== null) {
    mesArray = measures.map((measure) => ({
      createdAt: measure.createdAt,
      id: measure.id,
      measureName: measure.measureName,
      updatedAt: measure.updatedAt,
      value: measure.value
    }));
  }

  const handleRowClick = async (index: number) => {
    setSelectedRowIndex(index);
  };

  const handleEdit = async () => {};

  const deleteMeasure = (index: number) => {
    if (user.id != null) {
      deleteMeasureHistory({ userid: user.id, mes_history_id: index });
    }
  };

  const handleDelete = async (index: number) => {
    dispatch(
      showMessageModal({
        messageType: MessageTypes.DECISION,
        headerText: tt('Measure Deletion'),
        messageText: MODAL_HEADERS_MESSAGES.DELETION_ACTION,
        buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
        altbuttonText: MODAL_BUTTONS_TEXTS.REFUSE,
        onProceed: () => {
          deleteMeasure(index);
        }
      })
    );
  };

  return (
    <MeasureHistory
      mesArray={mesArray}
      handleRowClick={handleRowClick}
      index={index}
      setIndex={setIndex}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MeasureHistoryContainer;
