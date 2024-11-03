import React from 'react';
import { ImageBackground } from 'react-native';
import Meal from '../../Components/Meal/Meal';

import { mealStyles } from '../../Components/Meal/mealStyles';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { RecipesClient } from '../../../../interfaces/meals/add-meal.interface';

/**
 * Represents MealsScreen screen ui
 * @returns JSX.Element
 */
interface MealsScreenProps {
  data: RecipesClient;
  numericInput: boolean;
  viewMoreDetails: () => void;
  handleAdd: (
    meal_carbs: number,
    meal_calories: number,
    meal_protein: number,
    meal_fibers: number,
    qty: number
  ) => void;
}

const MealsScreen: React.FC<MealsScreenProps> = ({
  data,
  numericInput,
  handleAdd,
  viewMoreDetails
}): JSX.Element => {
  return (
    <ImageBackground
      source={Images.mealBackground}
      resizeMode="cover"
      style={mealStyles.image}>
      <Meal
        handleAdd={handleAdd}
        id={data.id}
        title={data.name}
        calories={data.Calories}
        protein={data.ProteinContent}
        lipids={data.CholesterolContent}
        carbs={data.CarbohydratesContent}
        qtyPerunit={1}
        numericInput={numericInput}
        viewMoreDetails={viewMoreDetails}
      />
    </ImageBackground>
  );
};

export default MealsScreen;
