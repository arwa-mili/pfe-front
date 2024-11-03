import React from 'react';
import MeasureCardContainer from '../../Components/MeasureCustomCard/measureCard.container';
import { ScrollView } from 'react-native';
import { stylesDiabeties2MeasuresPage } from './diabetiesMeasuresStyles';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import { MeasureCardAttributes } from '../../Utils/HelperFunctions/getEveryMeasureLastValue';

interface Diabeties2MeasuresPagePresenterProps {
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
const Diabeties2MeasuresPage: React.FC<
  Diabeties2MeasuresPagePresenterProps
> = ({ data, gotoDetails }) => {
  return (
    <ScrollView focusable style={stylesDiabeties2MeasuresPage.container}>
      <MeasureCardContainer data={data} goToDetails={gotoDetails} />
    </ScrollView>
  );
};

export default Diabeties2MeasuresPage;
