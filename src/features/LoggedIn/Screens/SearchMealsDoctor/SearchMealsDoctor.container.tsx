import React, { useEffect, useState } from 'react';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import SearchMealsDoctor from './SearchMealsDoctor';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import {
  ADDCUSTOMMEAL_SCREEN,
  Meals_SCREEN,
  SEARCHMEALSDOCTOR_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { MealTypeDto } from '../../../../interfaces/meals/mealTypeDto.interface';
import { useDispatch } from 'react-redux';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { MealsClient } from '../../../../interfaces/meals/mealsClient.interface';
import { useFindByMealTypeQuery } from '../../../../store/apis/nutritionPlansApis/nutritionPlansApis';
import { useAppSelector } from '../../../../hooks/hooks';

/**
 * Container used to separate SearchMealsDoctor logic as a wrapper to SearchMealsDoctor screen
 * @returns JSX.Element
 */
interface SearchMealsDoctorContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof SEARCHMEALSDOCTOR_SCREEN
  > {}

const SearchMealsDoctorContainer: React.FC<SearchMealsDoctorContainerProps> = ({
  navigation,
  route
}): JSX.Element => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [dataTosend, setDataTosend] = useState<MealsClient[]>([]);
  const userid = useAppSelector((state) => state.user.id as number);
  const mealType = route.params.mealType;
  let dto: MealTypeDto = {
    mealType: mealType,
    page: page
  };
  const handlePress = (id: number) => {
    navigation.navigate(Meals_SCREEN, { id: id, add: true });
  };

  const { isFetching, isLoading, data, isError, error } =
    useFindByMealTypeQuery({
      mealTypeDTO: dto,
      userid
    });

  useEffect(() => {
    if (data) {
      if (data.meals.length === 0) {
        setTotalPage(data.totalPages);
      } else {
        setDataTosend((prevData) => [...prevData, ...data.meals]);
      }
    }
  }, [data]);

  setLoading(isLoading, data, dispatch, isFetching);

  if (isError) {
    dispatch(setLoaderFalse());

    handleGenericError(error, dispatch);
  }

  const handleLoadMore = () => {
    if (page < totalPage - 1) {
      setPage((page) => page + 1);
    } else {
      setLoadMoreVisible(false);
    }
  };

  return (
    <SearchMealsDoctor
      data={dataTosend}
      handlePress={(id) => handlePress(id)}
      navigateToAddCustomMeal={() =>
        navigation.navigate(ADDCUSTOMMEAL_SCREEN, { mealType })
      }
      handleLoadMore={handleLoadMore}
      loadMoreVisible={loadMoreVisible}
    />
  );
};

export default SearchMealsDoctorContainer;
