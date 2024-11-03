import React from 'react';
import MeasureCardContainer from '../../Components/MeasureCustomCard/measureCard.container';
import { ScrollView } from 'react-native';
import { MeasureCardAttributes } from '../../Utils/HelperFunctions/getEveryMeasureLastValue';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import { stylesDiabeties2MeasuresPage } from '../Diabeties2Measures/diabetiesMeasuresStyles';

interface ShowMeasuresPresenterProps {
  data: MeasureCardAttributes[];
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
    limitInf: number | null,
    limitSup: number | null
  ) => void;
}
const ShowMeasues: React.FC<ShowMeasuresPresenterProps> = ({
  data,
  gotoDetails
}) => {
  return (
    <ScrollView focusable style={stylesDiabeties2MeasuresPage.container}>
      <MeasureCardContainer data={data} goToDetails={gotoDetails} />
    </ScrollView>
  );
};

export default ShowMeasues;
