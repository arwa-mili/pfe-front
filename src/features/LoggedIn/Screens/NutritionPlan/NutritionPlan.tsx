import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { Days } from '../../../../utils/consts/days/days';
import { stylesMealsPlan } from './nutritionPlanStyles';
import { tt } from '../../../../locales/translation.config';
import { stylesSelectedPlanById } from '../SelectedPlanByIdContainer/selectedPlanByIdContainerStyles';
import { Button } from '../../../../components/Button/Button';

interface NutritionPlanProps {
  mealsTypes: MealType[];
  handleAddMealPress: (mealType: MealType, dayIndex: number) => void;
  data: IMealsOfPlanResponseDoctor | any | string[];
  handleDelete: (id: number) => void;
}

Dimensions.get('window');

interface MealType {
  title: string;
}

const NutritionPlan: React.FC<NutritionPlanProps> = ({
  mealsTypes,
  handleAddMealPress,
  handleDelete,
  data
}): JSX.Element => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const days = [
    Days.Sunday,
    Days.Monday,
    Days.Tuesday,
    Days.Wednesday,
    Days.Thursday,
    Days.Friday,
    Days.Saturday
  ];

  const renderDaySlider = () => {
    return (
      <FlatList
        data={days}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(day, index) => `day_${index}`}
        renderItem={({ item: day, index: dayIndex }) => (
          <View>
            <View style={[stylesMealsPlan.dayItem]}>
              <Text style={[stylesMealsPlan.dayText]}>{day}</Text>
            </View>
            <FlatList
              style={stylesMealsPlan.flatlistContainer}
              data={mealsTypes}
              keyExtractor={(meal, index) => `meal_${index}`}
              renderItem={({ item, index }) =>
                renderItem(item, index, data, dayIndex)
              }
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false
                }
              )}
            />
          </View>
        )}
      />
    );
  };

  const renderItem = (
    item: MealType,
    index: number,
    dataa: IMealsOfPlanResponseDoctor,
    dayIndex: number
  ) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleAddMealPress(item, dayIndex);
        }}>
        <View style={stylesMealsPlan.item}>
          <Text
            style={[stylesMealsPlan.title, stylesMealsPlan.selectedDayText]}>
            {item.title}
          </Text>
        </View>
        <FlatList
          horizontal
          style={stylesSelectedPlanById.flatlistContainer}
          data={dataa.weekdaysMeals
            .filter((weekdayMeal) => weekdayMeal.day === dayIndex)
            .flatMap((weekdayMeal) =>
              weekdayMeal.meals_pertype
                .filter(
                  (mealType) => mealType.mealType.toString() === item.title
                )
                .flatMap((mealType) => mealType.meals)
            )}
          keyExtractor={(meal, index) => `meal_${index}`}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={stylesMealsPlan.container}>
        <View style={stylesMealsPlan.titleView}>
          <Text style={stylesMealsPlan.titlle}>
            {' '}
            {tt('Your plan of the week :')}
          </Text>
        </View>

        {renderDaySlider()}
      </View>
      <View style={stylesSelectedPlanById.buttonsContainer}>
        <Button
          style={stylesSelectedPlanById.button}
          title={tt('Delete Plan')}
          onTap={() => handleDelete}
          isloading={false}
          enabledActiveOpacity={true}
        />
      </View>
    </>
  );
};
export default NutritionPlan;
