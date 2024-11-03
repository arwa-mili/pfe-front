import * as React from 'react';

import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  BILANMEASURES_SCREEN,
  ONEMEASUREDETAILS_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { useAppSelector } from '../../../../hooks/hooks';
import GeneralBilanMeasuresScreen from './GeneralBilanMeasuresScreen';
import { Data } from '../../Interfaces/Data/Data.interface';
import {
  getEveryMeasureLastValue,
  MeasureCardAttributes
} from '../../Utils/HelperFunctions/getEveryMeasureLastValue';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { convertToMeasureClientArray } from '../../Utils/HelperFunctions/convertToCardMeasures';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import { MeasureClient } from '../../../../interfaces/measures/measures-client.interface';

type GenericMeasuresPagePresenterProps = DrawerScreenProps<
  DrawerNavigatorParamList,
  typeof BILANMEASURES_SCREEN
>;
const GeneralBilanMeasuresScreenContainer: React.FC<
  GenericMeasuresPagePresenterProps
> = ({ navigation }): JSX.Element => {
  const measures = useAppSelector((state) => state.mesureLabo?.measuresLabo);
  let mes: MeasureCardAttributes[] = [];
  const measureHistory = useAppSelector(
    (state) => state.mesureHistory?.measures
  );
  if (measureHistory) {
    mes = getEveryMeasureLastValue(measures as Data[], measureHistory);
  } else {
    mes = convertToMeasureClientArray(measures as MeasureClient[]);
  }
  const goToDetails = (
    measure: number | null,
    name: string,
    specification: string | null | undefined,
    lastMeasured: string,
    unit: UnitMeasure,
    iconColor: string | boolean,
    iconName: string | boolean,
    measure_id: number | null | undefined,
    min: number,
    max: number,
    limitInf: number | null,
    limitSup: number | null
  ) => {
    navigation.navigate(ONEMEASUREDETAILS_SCREEN, {
      measure,
      name,
      specification,
      lastMeasured,
      unit,
      iconColor,
      iconName,
      measure_id,
      min,
      max,
      limitInf,
      limitSup
    });
  };

  return (
    <GeneralBilanMeasuresScreen measures={mes} gotoDetails={goToDetails} />
  );
};

export default GeneralBilanMeasuresScreenContainer;
