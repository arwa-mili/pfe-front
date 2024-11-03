import {
  mapFindByMealTypeResponse,
  MealResponse,
  MealsClientResponse
} from '../../../interfaces/meals/mealsClient.interface';
import { IMealsInPlanResponse } from '../../../interfaces/meals/mealsInPlanResponse.interface';
import {
  IMealsOfPlanResponseDoctor,
  mapMealsOfPlanResponse
} from '../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { MealTypeDto } from '../../../interfaces/meals/mealTypeDto.interface';
import {
  FindByMealType,
  GetPlanById
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';
export const nutritionPlansApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetPlanById: builder.query<IMealsOfPlanResponseDoctor, { id: number }>({
      query: (credentials) => ({
        url: GetPlanById.replace(':id', credentials.id.toString()),
        method: 'GET'
      }),
      transformResponse: (response: IMealsInPlanResponse) => {
        return mapMealsOfPlanResponse(response);
      }
    }),
    FindByMealType: builder.query<
      MealsClientResponse,
      { mealTypeDTO: MealTypeDto; userid: number }
    >({
      query: ({ mealTypeDTO, userid }) => ({
        url: FindByMealType.replace(
          ':mealType',
          mealTypeDTO.mealType.toString()
        )
          .replace(':userid', userid.toString())
          //.replace(':diseases', mealTypeDTO.diseases.join(','))
          .replace(':page', mealTypeDTO.page.toString()),
        method: 'GET'
      }),
      providesTags: ['Meals'],

      transformResponse: (response: MealResponse) =>
        mapFindByMealTypeResponse(response)
    })
  })
});
export const {
  useGetPlanByIdQuery,
  useFindByMealTypeQuery,
  useLazyGetPlanByIdQuery
} = nutritionPlansApiSlice;
