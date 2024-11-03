import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { stylesMealsPlan } from '../NutritionPlan/nutritionPlanStyles';
import { tt } from '../../../../locales/translation.config';
import { Days } from '../../../../utils/consts/days/days';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { Button } from '../../../../components/Button/Button';
import { stylesSelectedPlanById } from './selectedPlanByIdContainerStyles';

interface SelectedPlanByIdContainerProps {
  mealsTypes: MealType[];
  handleAddMealPress: (mealType: MealType, dayIndex: number) => void;
  handleSubscribe: (
    weeklyCarbohydrates: number,
    weeklyFats: number,
    weeklyLipids: number,
    weeklyProtein: number
  ) => void;
  data: IMealsOfPlanResponseDoctor;
  isloading: boolean;
  handleDelete: (id: number) => void;
}

Dimensions.get('window');

interface MealType {
  title: string;
}

const SelectedPlanByIdContainer: React.FC<SelectedPlanByIdContainerProps> = ({
  mealsTypes,
  handleAddMealPress,
  handleSubscribe,
  isloading,
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
    <View style={stylesMealsPlan.container}>
      <View style={stylesSelectedPlanById.titleView}>
        <View style={stylesSelectedPlanById.top}>
          <View style={stylesSelectedPlanById.inside}>
            <Text style={stylesSelectedPlanById.title}>
              {tt('Tot. Sugar     ')}
            </Text>
            <Text style={stylesSelectedPlanById.value}>
              {data.weeklyCarbohydrates}
            </Text>
          </View>
          <View style={stylesSelectedPlanById.inside}>
            <Text style={stylesSelectedPlanById.title}>{tt('Tot. Fats')}</Text>
            <Text style={stylesSelectedPlanById.value}>{data.weeklyFats}</Text>
          </View>
        </View>
        <View style={stylesSelectedPlanById.top}>
          <View style={stylesSelectedPlanById.inside}>
            <Text style={stylesSelectedPlanById.title}>{'Tot. Calories'}</Text>
            <Text style={stylesSelectedPlanById.value}>
              {data.weeklyLipids}
            </Text>
          </View>
          <View style={stylesSelectedPlanById.inside}>
            <Text style={stylesSelectedPlanById.title}>{'Tot. Protein'}</Text>
            <Text style={stylesSelectedPlanById.value}>
              {data.weeklyProtein}
            </Text>
          </View>
        </View>
      </View>
      {renderDaySlider()}
      <View style={stylesSelectedPlanById.buttonsContainer}>
        <Button
          style={stylesSelectedPlanById.button}
          title={tt('Delete Plan')}
          onTap={() => handleDelete(data.id)}
          isloading={isloading}
          enabledActiveOpacity={true}
        />
        <Button
          style={stylesSelectedPlanById.button}
          title={tt('Subscribe In Plan')}
          onTap={() =>
            handleSubscribe(
              data.weeklyCarbohydrates,
              data.weeklyFats,
              data.weeklyLipids,
              data.weeklyProtein
            )
          }
          isloading={isloading}
          enabledActiveOpacity={true}
        />
      </View>
    </View>
  );
};

export default SelectedPlanByIdContainer;
