import { AddMealToPlanRequest } from '../../../components/CustomMealAdditionPopUp/CustomMealAdditionPopUp';
import { AddMealNameDto } from '../../../features/LoggedIn/Screens/AddCustomMeal/interfaces/AddMealName.interface';

import {
  ICustomMealInfoClient,
  mapGetRecipeByIdResponse,
  RecipesClient
} from '../../../interfaces/meals/add-meal.interface';
import {
  mapGetPlansOfUserResponse,
  NutritionPlansOfUserResponse,
  NutritionPlansOfUserResponseClient
} from '../../../models/Plan';
import { Recipe } from '../../../models/Recipe';
import {
  customMealAdd,
  getRecipeById,
  GetUserPlans_PATH,
  SubmitImageMeal_Path,
  SubmitMealName_Path
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';

export const mealsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addMealName: builder.mutation<ICustomMealInfoClient, AddMealNameDto>({
      query: (credentials) => ({
        url: SubmitMealName_Path,
        method: 'POST',
        body: credentials
      })
    }),
    addMeal: builder.mutation<RecipesClient, AddMealToPlanRequest>({
      query: (credentials) => ({
        url: customMealAdd,
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: Recipe) => {
        return mapGetRecipeByIdResponse(response);
      }
    }),
    addMealImage: builder.mutation<ICustomMealInfoClient, { images: FormData }>(
      {
        query: ({ images }) => ({
          url: SubmitImageMeal_Path,
          method: 'PUT',
          body: images,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          formData: true
        })
      }
    ),
    getMealById: builder.query<RecipesClient, { id: number }>({
      query: ({ id }) => ({
        url: getRecipeById.replace(':id', id.toString()),
        method: 'GET'
      }),
      transformResponse: (response: Recipe) => {
        return mapGetRecipeByIdResponse(response);
      }
      //providesTags: ['RecipeMeals']
    }),
    getUserPlans: builder.query<
      NutritionPlansOfUserResponseClient,
      { userid: number; page: number }
    >({
      query: ({ userid, page }) => ({
        url: GetUserPlans_PATH.replace(':userid', userid.toString()).replace(
          ':page',
          page.toString()
        ),
        method: 'GET'
      }),
      transformResponse: (response: NutritionPlansOfUserResponse) => {
        return mapGetPlansOfUserResponse(response);
      },
      providesTags: ['RecipeMeals']
    })
  })
});

export const {
  useAddMealNameMutation,
  useAddMealImageMutation,
  useGetMealByIdQuery,
  useGetUserPlansQuery,
  useAddMealMutation
} = mealsApiSlice;
