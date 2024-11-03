import * as React from 'react';

import ShowMeasues from './ShowMeasures';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import {
  HYPERTENSION_SCREEN,
  ONEMEASUREDETAILS_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { Data } from '../../Interfaces/Data/Data.interface';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import { DISEASES_NAMES } from '../../../../utils/consts/diseasesNames/diseasesNames';
import { useAppSelector } from '../../../../hooks/hooks';
import {
  getEveryMeasureLastValue,
  MeasureCardAttributes
} from '../../Utils/HelperFunctions/getEveryMeasureLastValue';
import {
  getDistinctMeasuresForDisease,
  mapDistictMeasuresToData
} from '../../Utils/HelperFunctions/getDistinctMeasures';

type ShowMeasuresProps = DrawerScreenProps<
  DrawerNavigatorParamList,
  typeof HYPERTENSION_SCREEN
>;

const ShowMeasuresContainer = ({ navigation }: ShowMeasuresProps) => {
  const diseases = useAppSelector((state) => state.diseasesschedules.diseases);
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
      unit,
      lastMeasured,
      specification,
      iconColor,
      iconName,
      measure_id,
      min,
      max,
      limitInf,
      limitSup
    });
  };
  let mes: MeasureCardAttributes[] = [];
  const measureHistory = useAppSelector(
    (state) => state.mesureHistory?.measures
  );
  if (diseases != null) {
    const measures = getDistinctMeasuresForDisease(
      diseases,
      DISEASES_NAMES.HYPERTENSION
    );
    const measuresmapped = mapDistictMeasuresToData(measures);
    if (measureHistory) {
      mes = getEveryMeasureLastValue(measuresmapped as Data[], measureHistory);
    }
  }

  //titlewill be pased as props
  return (
    <>
      <ShowMeasues data={mes} gotoDetails={goToDetails} />
    </>
  );
};

export default ShowMeasuresContainer;
