import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { MealOfDay } from '../../../../interfaces/meals/get-meals-of-day.interface';
import { stylescurrentDayMeal } from './currentDayMealsStyles';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { useLazyGetMealsOfPlanOfDayQuery } from '../../../../store/apis/userPlansApis/userPlansApis';
import { setMealsAndDay } from '../../../../hooks/Slices/mealsOfDay';
import { setPlanId } from '../../../../hooks/Slices/mealOfPlanSlice';

interface CurrentDayMealProps {}

interface RenderItemProps {
  item: MealOfDay;
}

const CurrentDayMeal: React.FC<CurrentDayMealProps> = ({}) => {
  const [getMeals] = useLazyGetMealsOfPlanOfDayQuery();
  const [mealOfDay, setMealOfDay] = useState<MealOfDay[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const meals = useAppSelector((state) => state.mealsOfDay);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const result = await getMeals({ userid: user?.id as number }).unwrap();
        if (result) {
          dispatch(
            setMealsAndDay({ mealsOfDay: result, day: new Date().getDay() }),
            setPlanId({ nutrition_plan_id: user.current_plan as number })
          );
          setMealOfDay(result);
        }
      } catch (error) {
        handleGenericError(error, dispatch);
      }
    };
    if (
      (meals.mealsOfDay.length === 0 ||
        meals.planid === null ||
        meals.day !== new Date().getDay()) &&
      user.current_plan !== null
    ) {
      fetchMeals();
    }
  }, [
    dispatch,
    getMeals,
    meals.day,
    meals.mealsOfDay.length,
    meals.planid,
    user.current_plan,
    user?.id
  ]);

  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <View style={stylescurrentDayMeal.mealTypeContainer}>
        <View style={stylescurrentDayMeal.ContainerMeal}>
          <Text style={stylescurrentDayMeal.mealType}>
            {item.mealType.toString()}
          </Text>
          <FlatList
            data={item.meals}
            renderItem={({ item: meal }) => (
              <Text style={stylescurrentDayMeal.mealName}>{meal.name}</Text>
            )}
            keyExtractor={(meal) => meal.name}
          />
        </View>
      </View>
    );
  };

  return mealOfDay && mealOfDay.length > 0 ? (
    <View style={stylescurrentDayMeal.container}>
      <FlatList
        style={stylescurrentDayMeal.flatListContentContainer}
        data={mealOfDay}
        renderItem={renderItem}
        keyExtractor={(item) => item.mealType.toString()}
        horizontal
      />
    </View>
  ) : (
    <Text>
      You aren't subscribed to any plan. Create your plan and subscribe to get
      your day to day meals displayed here !
    </Text>
  );
};

export default CurrentDayMeal;
