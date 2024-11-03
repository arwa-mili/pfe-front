import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { tt } from '../../../../locales/translation.config';
import { stylesMeasuresCard } from './measureCardStyles';
import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

interface CardsComponentsProps {
  name: string;
  measure: number | null;
  specification: string | null | undefined;
  max: number;
  min: number;
  lastMeasure: string;
  unit: UnitMeasure;
  measure_id: number | null | undefined;
  iconName: string | boolean;
  iconColor: string | boolean;
  isVisible: boolean;
  onFocusEnables: boolean;
  onFocus:
    | ((
        measure: number | null,
        name: string,
        specification: string | null | undefined,
        lastMeasured: string,
        unit: UnitMeasure,
        iconColor: string | boolean,
        iconName: string | boolean,
        measure_id: number,
        min: number,
        max: number
      ) => void)
    | undefined;
}
export const MeasureCardPresenter: React.FC<CardsComponentsProps> = ({
  name,
  measure,
  specification,
  measure_id,
  iconName,
  lastMeasure,
  iconColor,
  unit,
  isVisible,
  onFocusEnables,
  onFocus,
  max,
  min
}) => {
  return (
    <ScrollView>
      <View style={stylesMeasuresCard.container}>
        <Card containerStyle={[stylesMeasuresCard.cardContainer]}>
          <View style={stylesMeasuresCard.titleAlign}>
            <Card.Title style={stylesMeasuresCard.title}>{name}</Card.Title>
            {isVisible && (
              <Icons.Material
                color={
                  typeof iconColor === 'string' ? iconColor : Color.colorBlack
                }
                name={
                  typeof iconName === 'string' ? iconName : 'default-icon-name'
                }
                size={40}
              />
            )}
          </View>
          <Text style={stylesMeasuresCard.text}>{specification}</Text>
          {onFocusEnables && (
            <TouchableOpacity
              onPress={() => {
                onFocus &&
                  measure_id &&
                  onFocus(
                    measure,
                    name,
                    specification,
                    lastMeasure,
                    unit,
                    iconColor,
                    iconName,
                    measure_id,
                    min,
                    max
                  );
              }}
              style={stylesMeasuresCard.touchableOpacity}>
              <Text style={stylesMeasuresCard.goToval}>...</Text>
            </TouchableOpacity>
          )}
          <View style={stylesMeasuresCard.cardContent}>
            <View style={stylesMeasuresCard.measureInfos}>
              <Text style={stylesMeasuresCard.value}>{measure}</Text>
              <Text style={stylesMeasuresCard.unit}>{unit}</Text>
            </View>
            <View style={stylesMeasuresCard.measureInfos}>
              <Text style={stylesMeasuresCard.text}>
                {tt('Last measured on')}
              </Text>
              <Text style={stylesMeasuresCard.infos}>{lastMeasure}</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default MeasureCardPresenter;
