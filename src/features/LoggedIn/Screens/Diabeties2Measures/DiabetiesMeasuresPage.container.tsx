import * as React from 'react';

import Diabeties2MeasuresPage from './DiabetiesMeasuresPage';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import {
  DIABETIES2_SCREEN,
  ONEMEASUREDETAILS_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { useAppSelector } from '../../../../hooks/hooks';
import {
  getDistinctMeasuresForDisease,
  mapDistictMeasuresToData
} from '../../Utils/HelperFunctions/getDistinctMeasures';
import { DISEASES_NAMES } from '../../../../utils/consts/diseasesNames/diseasesNames';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import {
  getEveryMeasureLastValue,
  MeasureCardAttributes
} from '../../Utils/HelperFunctions/getEveryMeasureLastValue';
import { Data } from '../../Interfaces/Data/Data.interface';

type Diabeties2MeasuresPagePresenterProps = DrawerScreenProps<
  DrawerNavigatorParamList,
  typeof DIABETIES2_SCREEN
>;

const Diabeties2MeasuresPageContainer = ({
  navigation
}: Diabeties2MeasuresPagePresenterProps) => {
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
      DISEASES_NAMES.DIABETIES_TYPE_2
    );
    const measuresmapped = mapDistictMeasuresToData(measures);
    if (measureHistory) {
      mes = getEveryMeasureLastValue(measuresmapped as Data[], measureHistory);
    }
  }

  return (
    <>
      <Diabeties2MeasuresPage data={mes} gotoDetails={goToDetails} />
    </>
  );
};

export default Diabeties2MeasuresPageContainer;
