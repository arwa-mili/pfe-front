import React from 'react';
import { ScrollView } from 'react-native';
import MeasureCardContainer from '../../Components/MeasureCustomCard/measureCard.container';
import { stylesDiabeties2MeasuresPage } from '../Diabeties2Measures/diabetiesMeasuresStyles';
import { MeasureCardAttributes } from '../../Utils/HelperFunctions/getEveryMeasureLastValue';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';

/**
 * Represents GeneralBilanMeasuresScreen screen ui
 * @returns JSX.Element
 */
interface GeneralBilanMeasuresScreenProps {
  measures: MeasureCardAttributes[];
  gotoDetails: (
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

const GeneralBilanMeasuresScreen: React.FC<GeneralBilanMeasuresScreenProps> = ({
  measures,
  gotoDetails
}): JSX.Element => {
  return (
    <ScrollView focusable style={stylesDiabeties2MeasuresPage.container}>
      <MeasureCardContainer data={measures} goToDetails={gotoDetails} />
    </ScrollView>
  );
};

export default GeneralBilanMeasuresScreen;
