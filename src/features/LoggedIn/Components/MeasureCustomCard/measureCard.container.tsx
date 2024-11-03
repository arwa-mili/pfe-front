import React from 'react';

import MeasureCardPresenter from './MeasureCard';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { MeasureCardAttributes } from '../../Utils/HelperFunctions/getEveryMeasureLastValue';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
interface Props {
  data: MeasureCardAttributes[];
  goToDetails: (
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
    limit_inf: number | null,
    limit_sup: number | null
  ) => void;
}
export const MeasureCardContainer = ({ data, goToDetails }: Props) => {
  return (
    <>
      {data.map((item, index) => (
        <MeasureCardPresenter
          key={index}
          name={item.name}
          measure={item.measure}
          specification={item.specification}
          measure_id={item.measure_id}
          unit={item.unit}
          lastMeasure={item.lastMeasured}
          iconName={
            item.measure !== null &&
            (item.measure < item.limitInf
              ? 'warning'
              : item.measure > item.limitSup
              ? 'warning'
              : 'check-circle')
          }
          iconColor={
            item.measure !== null &&
            (item.measure < item.limitInf
              ? Color.colorLightGoldenrodYellow
              : item.measure > item.limitSup
              ? Color.colorDarkOrange
              : Color.colorLimeGreen)
          }
          onFocus={(
            measure: number | null,
            name: string,
            specification: string | null | undefined,
            lastMeasure: string,
            unit: UnitMeasure,
            iconColor: string | boolean,
            iconName: string | boolean,
            measure_id: number,
            min: number,
            max: number
          ) =>
            goToDetails(
              measure,
              name,
              specification,
              lastMeasure,
              unit,
              iconColor,
              iconName,
              measure_id,
              min,
              max,
              item.limitInf,
              item.limitSup
            )
          }
          isVisible={item.measure != null}
          onFocusEnables={true}
          max={item.max}
          min={item.min}
        />
      ))}
    </>
  );
};

export default MeasureCardContainer;
