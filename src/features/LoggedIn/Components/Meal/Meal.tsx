import React, { useMemo, useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { mealStyles } from './mealStyles';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import NumericInput from 'react-native-numeric-input';
import { Button } from '../../../../components/Button/Button';
import { stylesGlobal } from '../../Utils/styling/globalStyles';
import { tt } from '../../../../locales/translation.config';
import { TouchableOpacity } from 'react-native';
import { stylesLogin } from '../../../OnBoarding/Screens/Login/loginStyle';

interface MealProps {
  title: string;
  calories: number;
  protein: number;
  lipids: number;
  id: number;
  carbs: number;
  qtyPerunit: number;
  numericInput: boolean;
  viewMoreDetails: () => void;
  handleAdd?: (
    meal_carbs: number,
    meal_calories: number,
    meal_protein: number,
    meal_fibers: number,
    qty: number
  ) => void;
}

const Meal: React.FC<MealProps> = ({
  title,
  calories,
  protein,
  lipids,
  carbs,
  qtyPerunit,
  numericInput,
  handleAdd,
  viewMoreDetails
}) => {
  const [qty, setQty] = useState(1);
  const meal_carbs = useMemo(() => qty * carbs, [qty, carbs]);
  const meal_lipids = useMemo(() => qty * lipids, [qty, lipids]);
  const meal_calories = useMemo(() => qty * calories, [qty, calories]);
  const meal_protein = useMemo(() => qty * protein, [qty, protein]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'column', marginTop: 80, flex: 2 }}>
          <Text style={mealStyles.title}>{title}</Text>
          <View style={[mealStyles.avatar]}>
            <Image style={mealStyles.Image} source={Images.mealAvatar} />
          </View>
        </View>

        <View
          style={{
            flex: 2,
            backgroundColor: Color.colorWhitesmoke,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}>
          {numericInput && (
            <View style={mealStyles.numericInput}>
              <NumericInput
                value={qty}
                onChange={setQty}
                minValue={1}
                maxValue={20}
                type="plus-minus"
                rounded
                valueType="real"
                step={0.25}
              />
            </View>
          )}
          <View style={mealStyles.detailsContainer}>
            <View style={mealStyles.row}>
              <View style={mealStyles.column}>
                <Text style={mealStyles.detailText}>Calories:</Text>
                <Text style={mealStyles.detailText}>
                  {' '}
                  {meal_calories}{' '}
                  <Text
                    style={[
                      mealStyles.detailText,
                      { color: Color.colorCrimson }
                    ]}>
                    kcal
                  </Text>{' '}
                </Text>
              </View>
              <View style={mealStyles.separator} />
              <View style={mealStyles.column}>
                <Text style={mealStyles.detailText}>Protein: </Text>
                <Text style={mealStyles.detailText}>
                  {' '}
                  {meal_protein}{' '}
                  <Text
                    style={[
                      mealStyles.detailText,
                      { color: Color.colorCrimson }
                    ]}>
                    mg
                  </Text>
                </Text>
              </View>
              <View style={mealStyles.separator} />
              <View style={mealStyles.column}>
                <Text style={mealStyles.detailText}>Fats: </Text>
                <Text style={mealStyles.detailText}>
                  {' '}
                  {meal_lipids}{' '}
                  <Text
                    style={[
                      mealStyles.detailText,
                      { color: Color.colorCrimson }
                    ]}>
                    mg
                  </Text>
                </Text>
              </View>
              <View style={mealStyles.separator} />
              <View style={mealStyles.column}>
                <Text style={mealStyles.detailText}>Carbs: </Text>
                <Text style={mealStyles.detailText}>
                  {' '}
                  {meal_carbs}{' '}
                  <Text
                    style={[
                      mealStyles.detailText,
                      { color: Color.colorCrimson }
                    ]}>
                    mg
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={mealStyles.unitContainer}>
            <View style={mealStyles.rowUnit}>
              <View style={mealStyles.rowUnit}>
                <Icons.Material
                  style={mealStyles.Icon}
                  size={36}
                  name="restaurant-menu"
                />
                <View style={mealStyles.unitLabel}>
                  <Text style={stylesLogin.text}>
                    <TouchableOpacity onPress={viewMoreDetails}>
                      <Text style={stylesLogin.link}>
                        {tt('View More Details')}
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
              <View style={mealStyles.unitTextContainer}>
                <Text style={mealStyles.detailText}>
                  {qtyPerunit} {tt('dish')}
                </Text>
              </View>
            </View>
          </View>
          {numericInput && (
            <View style={mealStyles.buttonView}>
              <Button
                textStyles={stylesGlobal.buttonText}
                style={[stylesGlobal.button, mealStyles.button]}
                title={'Add'}
                onTap={() => {
                  handleAdd &&
                    handleAdd(
                      meal_carbs,
                      meal_calories,
                      meal_protein,
                      meal_lipids,
                      qty
                    );
                }}
                enabledActiveOpacity={true}
                isloading={false}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Meal;
