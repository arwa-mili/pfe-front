import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItemInfo,
  TouchableOpacity
} from 'react-native';
import { stylesSuggestedMeals } from './suggestedMealsStyles';
import { useLazyGetSuggestedPlansQuery } from '../../../../store/apis/userPlansApis/userPlansApis';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { handleGenericError } from '../../../../utils/helpers/Errors';

interface SuggestedMealsProps {
  handlePlanPress: (id: number) => void;
}

const SuggestedMeals: React.FC<SuggestedMealsProps> = ({ handlePlanPress }) => {
  const userid = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  const [suggestedPlans, setSuggestedPlans] = useState<
    IMealsOfPlanResponseDoctor[]
  >([]);
  const [suggestedmeals, { data, isLoading, isFetching, isError, error }] =
    useLazyGetSuggestedPlansQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<IMealsOfPlanResponseDoctor>>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await suggestedmeals({
        userid: userid as number
      }).unwrap();
      setSuggestedPlans(result);
    } catch (err) {
      handleGenericError(err, dispatch);
    }
  }, [suggestedmeals, userid, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setLoading(isLoading, data, dispatch, isFetching);

    if (isError) {
      dispatch(setLoaderFalse());
      handleGenericError(error, dispatch);
    }
  }, [isLoading, data, isFetching, isError, error, dispatch]);

  const renderItem = ({
    item
  }: ListRenderItemInfo<IMealsOfPlanResponseDoctor>) => {
    return (
      <TouchableOpacity onPress={() => handlePlanPress(item.id)}>
        <View style={stylesSuggestedMeals.cardBorder}>
          <View style={stylesSuggestedMeals.flatListContentContainer}>
            <Text>{item.planName}</Text>
            <Text>Weekly Fats: {item.weeklyFats}</Text>
            <Text>Weekly Calories: {item.weeklyProtein}</Text>
            <Text>Weekly Carbohydrates: {item.weeklyCarbohydrates}</Text>
            <Text>Weekly Lipids: {item.weeklyLipids}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= suggestedPlans.length ? 0 : nextIndex;
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [suggestedPlans.length]);

  useEffect(() => {
    if (flatListRef.current && suggestedPlans.length > 0) {
      const indexToScroll = currentIndex % suggestedPlans.length;
      flatListRef.current.scrollToIndex({
        animated: true,
        index: indexToScroll,
        viewPosition: 0.5
      });
    }
  }, [currentIndex, suggestedPlans.length]);

  return suggestedPlans.length === 0 ? (
    <Text> You have no suggested Meals Yet</Text>
  ) : (
    <View>
      <FlatList
        ref={flatListRef}
        data={suggestedPlans}
        renderItem={renderItem}
        keyExtractor={(item) => item.planName}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 20));
          wait.then(() => {
            if (flatListRef.current) {
              flatListRef.current.scrollToIndex({
                index: info.index,
                animated: true,
                viewPosition: 0.5
              });
            }
          });
        }}
      />
    </View>
  );
};

export default SuggestedMeals;
