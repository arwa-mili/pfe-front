import React from 'react';
import { Text, View } from 'react-native';
import MeasureCard from '../../Components/MeasureCustomCard/MeasureCard';
import { Button } from '../../../../components/Button/Button';
import { stylesOneMeasueDetails } from './oneMeasureDetailsStyles';
import { stylesGlobal } from '../../Utils/styling/globalStyles';
import { tt } from '../../../../locales/translation.config';
import NumericInputModalPopUp from '../../../../components/NumericInputModalPopUp/NumericInputModalPopUp';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

interface OneMeasureDetailsProps {
  isVisible: boolean;
  specification: string | null | undefined;
  iconColor: string | boolean;
  iconName: string | boolean;
  measure: number | null;
  name: string;
  max: number;
  limitInf: number | null;
  limitSup: number | null;
  lastMeasured: string;
  min: number;
  loading: boolean;
  measure_id: number | null | undefined;
  unit: UnitMeasure;
  addNew: () => void;
  setIsVisibleFalse: () => void;
  handleSubmit: (newMeasure: number) => void;
}
const OneMeasureDetails: React.FC<OneMeasureDetailsProps> = ({
  isVisible,
  loading,
  iconColor,
  iconName,
  measure,
  name,
  specification,
  min,
  limitInf,
  limitSup,
  lastMeasured,
  unit,
  max,
  measure_id,
  addNew,
  setIsVisibleFalse,
  handleSubmit
}) => {
  return (
    <>
      {isVisible && (
        <NumericInputModalPopUp
          isVisible={isVisible}
          onCancel={setIsVisibleFalse}
          onSave={setIsVisibleFalse}
          max={max}
          handleSubmit={handleSubmit}
          min={min}
        />
      )}
      <View style={stylesOneMeasueDetails.mainContainer}>
        <MeasureCard
          measure={measure}
          name={name}
          iconName={iconName}
          iconColor={iconColor}
          isVisible={false}
          onFocusEnables={false}
          onFocus={undefined}
          measure_id={measure_id}
          max={max}
          min={min}
          unit={unit}
          lastMeasure={lastMeasured}
          specification={specification}
        />
        <View style={stylesOneMeasueDetails.MeasuresIndicator}>
          <View style={stylesOneMeasueDetails.OneIconInfo}>
            <Icons.Material
              color={Color.colorLightGoldenrodYellow}
              name={'warning'}
              size={40}
            />
            <Text style={stylesOneMeasueDetails.text}>
              {name} is considered low when under {limitInf}
            </Text>
          </View>
          <View style={stylesOneMeasueDetails.OneIconInfo}>
            <Icons.Material
              color={Color.colorLimeGreen}
              name={'check-circle'}
              size={40}
            />

            <Text style={stylesOneMeasueDetails.text}>
              {name} is considered normal when between {limitInf} and {limitSup}
            </Text>
          </View>
          <View style={stylesOneMeasueDetails.OneIconInfo}>
            <Icons.Material
              color={Color.colorDarkOrange}
              name={'warning'}
              size={40}
            />
            <Text style={stylesOneMeasueDetails.text}>
              {name} is considered high when above {limitSup}
            </Text>
          </View>
        </View>
        <View style={stylesOneMeasueDetails.buttonContainer}>
          <Button
            textStyles={stylesGlobal.buttonTextBigger}
            style={stylesGlobal.buttonBigger}
            title={tt('Add New')}
            onTap={addNew}
            enabledActiveOpacity={true}
            isloading={loading}
          />
        </View>
      </View>
    </>
  );
};

export default OneMeasureDetails;
