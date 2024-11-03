import React, { useEffect, useState } from 'react';

import { z, ZodError, ZodIssue } from 'zod';

import AddNutritionPlan from './AddNutritionPlan';
import {
  ADDNUTRITIONPLAN_SCREEN,
  NutritionPlanMeals_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { INutritionPlanDTO } from '../../../../interfaces/nutrition-plans/add-nutrition-plan.interface';
import { PeopleCategory } from '../../../../enums/PeopleCategoris.enum';
import { useCreateNutritionPlanMutation } from '../../../../store/apis/userPlansApis/userPlansApis';

/**
 * Container used to separate AddNutritionPlan logic as a wrapper to AddNutritionPlan screen
 * @returns JSX.Element
 */
interface AddNutritionPlanContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof ADDNUTRITIONPLAN_SCREEN
  > {}
const TitleSchema = z.string().min(1, { message: 'Title must not be empty' });
const DiseaseIdsSchema = z
  .array(z.number())
  .nonempty({ message: 'Disease IDs must not be empty' });
const CategoriesSchema = z
  .array(z.string())
  .nonempty({ message: 'Categories must not be empty' });

const AddNutritionPlanContainer: React.FC<AddNutritionPlanContainerProps> = ({
  navigation
}): JSX.Element => {
  const [addPlan] = useCreateNutritionPlanMutation();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('');
  const [diseaseIds, setDiseaseIds] = useState<number[]>();
  const [categories, setCategories] = useState<number[]>();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [, setDiseaseIdsError] = useState<string | null>(null);
  const [, setCategoriesError] = useState<string | null>(null);
  const [isLoadiing, setIsLodiing] = useState<boolean>(false);
  const userid = useAppSelector((state) => state.user.id as number);
  const userdiseases = useAppSelector((state) => state.user.diseases_of_user);

  useEffect(() => {
    if (userdiseases && userdiseases.length > 0) {
      setDiseaseIds(userdiseases);
    }
  }, [userdiseases]);

  const handleNext = async () => {
    try {
      setIsLodiing(true);
      TitleSchema.parse(title);
      const diseasesids = DiseaseIdsSchema.parse(diseaseIds);
      const category_people = CategoriesSchema.parse(categories);

      const related_people: PeopleCategory[] = category_people.map(
        (value) => value as PeopleCategory
      );

      const nutritionPlandto: INutritionPlanDTO = {
        title,
        relatedDiseases: diseasesids,
        people_related: related_people,
        created_by: userid
      };

      const nutrition_plan_id = await addPlan(nutritionPlandto).unwrap();

      navigation.navigate(NutritionPlanMeals_SCREEN, {
        plan_id: nutrition_plan_id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        error?.errors.forEach((validationError: ZodIssue) => {
          if (validationError.message.includes('Title')) {
            setTitleError(validationError.message);
          } else if (validationError.message.includes('Disease IDs')) {
            setDiseaseIdsError(validationError.message);
          } else if (validationError.message.includes('Categories')) {
            setCategoriesError(validationError.message);
          }
        });
      } else {
        await handleGenericError(error, dispatch);
      }
    } finally {
      setIsLodiing(false);
    }
  };

  return (
    <AddNutritionPlan
      handleNext={handleNext}
      title={title}
      setTitle={setTitle}
      selectRelatedPeople={(values) => setCategories(values as number[])}
      selectRelatedDiseases={(values) => setDiseaseIds(values as number[])}
      titleError={titleError}
      isLoading={isLoadiing}
      selectedDiseaseIds={diseaseIds ? diseaseIds : []}
      //diseaseIdsError={diseaseIdsError}
      //categoriesError={categoriesError}
    />
  );
};

export default AddNutritionPlanContainer;
