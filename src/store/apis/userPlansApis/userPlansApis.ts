import { IMealPerTypeDTO } from '../../../interfaces/meals/addMealToPlan.interface';
import { NutrimentsOfTheWeek } from '../../../interfaces/meals/nutrimentsOfWeek.interface';

import { MealOfDay } from '../../../interfaces/meals/get-meals-of-day.interface';
import { IMealsInPlanResponse } from '../../../interfaces/meals/mealsInPlanResponse.interface';
import {
  IMealsOfPlanResponseDoctor,
  mapMealsOfPlanResponse,
  mapSuggestedPlansResponse
} from '../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { INutritionPlanDTO } from '../../../interfaces/nutrition-plans/add-nutrition-plan.interface';
import {
  addMealToPlan,
  AddPlanToUser,
  checkfood,
  getMealsOfPlan,
  getMealsOfPlanOfDay,
  getSuggestedPlans,
  getWeeklyNutriments,
  NutritionPlans
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';
export const userPlansApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSuggestedPlans: builder.query<
      IMealsOfPlanResponseDoctor[],
      { userid: number }
    >({
      query: ({ userid }) => ({
        url: getSuggestedPlans.replace(':userid', userid.toString()),
        method: 'GET'
      }),
      transformResponse: (response: IMealsInPlanResponse[]) =>
        mapSuggestedPlansResponse(response)
    }),

    getWeeklyNutriments: builder.query<NutrimentsOfTheWeek, { userid: number }>(
      {
        query: (credentials) => ({
          url: getWeeklyNutriments.replace(
            ':userid',
            credentials.userid.toString()
          ),
          method: 'GET'
        })
      }
    ),
    addPlanToUser: builder.mutation<void, { userid: number; planid: number }>({
      query: (credentials) => ({
        url: AddPlanToUser.replace(
          ':userid',
          credentials.userid.toString()
        ).replace(':planid', credentials.planid.toString()),
        method: 'PUT'
      }),
      invalidatesTags: ['userCurrentPlan']
    }),
    getMealsOfPlanOfDay: builder.query<MealOfDay[], { userid: number }>({
      query: ({ userid }) => ({
        url: getMealsOfPlanOfDay.replace(':userid', userid.toString()),
        method: 'GET'
      })
      //providesTags: ['MealsOfPlan']
    }),
    getMealsOfPlan: builder.query<IMealsOfPlanResponseDoctor, { id: number }>({
      query: ({ id }) => ({
        url: getMealsOfPlan.replace(':id', id.toString()),
        method: 'GET'
      }),
      transformResponse: (response: IMealsInPlanResponse) => {
        return mapMealsOfPlanResponse(response);
      },

      providesTags: ['MealsOfPlan']
    }),
    addMealToPlan: builder.mutation<
      void,
      {
        dto: IMealPerTypeDTO;
        day: number;
        meal_id: number;
        nutrition_plan_id: number;
      }
    >({
      query: ({ dto, day, nutrition_plan_id, meal_id }) => ({
        url: addMealToPlan
          .replace(':meal_id', meal_id.toString())
          .replace(':day', day.toString())
          .replace(':nutrition_plan_id', nutrition_plan_id.toString()),
        method: 'POST',
        body: dto
      }),

      invalidatesTags: ['MealsOfPlan']
    }),

    checkfood: builder.mutation<void, { userid: number }>({
      query: ({ userid }) => ({
        url: checkfood.replace(':userid', userid.toString()),
        method: 'PUT'
      })
    }),

    createNutritionPlan: builder.mutation<number, INutritionPlanDTO>({
      query: (credentials) => ({
        url: NutritionPlans,
        method: 'POST',
        body: credentials
      })
    })
    /*
    getMealById: builder.query<MealsClient, { id: number }>({
      query: ({ id }) => ({
        url: getMealById.replace(':id', id.toString()),
        method: 'GET'
      }),
      transformResponse: (response: Meal) => mapGetMealByIdResponse(response)
    })
    */
  })
});
export const {
  useAddPlanToUserMutation,
  useGetMealsOfPlanQuery,
  useLazyGetMealsOfPlanOfDayQuery,
  useCreateNutritionPlanMutation,
  useAddMealToPlanMutation,
  useLazyGetSuggestedPlansQuery,
  useLazyGetWeeklyNutrimentsQuery,
  useCheckfoodMutation
} = userPlansApiSlice;
