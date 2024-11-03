import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { authSlice, AuthState } from '../hooks/Slices/AuthSlice';
import { apiSlice } from './apis/apiSlice';
import { userSlice, UserState } from '../hooks/Slices/UserSlice';
import { modalSlice } from '../hooks/Slices/MessageModalSlice';
import { diseasesSlice, DiseasesState } from '../hooks/Slices/DiseasesSlice';
import {
  diseasesSchedulesSlice,
  DiseasesSchedulesState
} from '../hooks/Slices/UserDiseasesScheduleSlice';
import {
  MeasureHistoryState,
  measuresHistorySlice
} from '../hooks/Slices/MeasureHistorySlice';
import { loaderSlice } from '../hooks/Slices/LoaderSlice';
import {
  mealOfPlanSlice,
  MealOfPlanState
} from '../hooks/Slices/mealOfPlanSlice';
import {
  measuresLaboSlice,
  MeasuresLaboState
} from '../hooks/Slices/MeasuresLaboSlice';
import { mealsOfDaySlice, MealsOfDayState } from '../hooks/Slices/mealsOfDay';

const mealofplanPersistConfig: PersistConfig<MealOfPlanState> = {
  key: 'day',
  storage: AsyncStorage,
  whitelist: ['day', 'mealType', 'nutrition_plan_id']
};
const authPersistConfig: PersistConfig<AuthState> = {
  key: 'token',
  storage: AsyncStorage,
  blacklist: ['token', 'rtoken'],
  whitelist: ['isFirstSignedUp', 'isAuthenticated', 'loadSplash']
};

const mealsOfDayPersistConfig: PersistConfig<MealsOfDayState> = {
  key: 'mealsOfDay',
  storage: AsyncStorage,
  whitelist: ['mealsOfDay', 'day']
};
const disschedPersistConfig: PersistConfig<DiseasesSchedulesState> = {
  key: 'diseases',
  storage: AsyncStorage,
  whitelist: ['diseases']
};

const measurehistoryPersistConfig: PersistConfig<MeasureHistoryState> = {
  key: 'measures',
  storage: AsyncStorage,
  whitelist: ['measures']
};

const measureLaboPersistConfig: PersistConfig<MeasuresLaboState> = {
  key: 'measuresLabo',
  storage: AsyncStorage,
  whitelist: ['measuresLabo']
};

const userPersistConfig: PersistConfig<UserState> = {
  key: 'id',
  storage: AsyncStorage,
  whitelist: [
    'email',
    'id',
    'name',
    'surname',
    'diseases_of_user',
    'weekly_carbohydrates',
    'weekly_fats',
    'diabhist',
    'cardiohist',
    'weekly_protein',
    'weekly_calories',
    'height',
    'weight',
    'phoneNumber',
    'BMI',
    'gender',
    'sportActivity',
    'age',
    'current_plan',
    'language'
  ]
};

const diseasesPersistConfig: PersistConfig<DiseasesState> = {
  key: 'disease',
  storage: AsyncStorage,
  whitelist: ['disease']
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistReducer<AuthState, UnknownAction>(
      authPersistConfig,

      authSlice.reducer
    ),

    loader: loaderSlice.reducer,
    user: persistReducer<UserState, UnknownAction>(
      userPersistConfig,

      userSlice.reducer
    ),
    modal: modalSlice.reducer,
    diseasesschedules: persistReducer<DiseasesSchedulesState, UnknownAction>(
      disschedPersistConfig,
      diseasesSchedulesSlice.reducer
    ),
    diseases: persistReducer<DiseasesState, UnknownAction>(
      diseasesPersistConfig,
      diseasesSlice.reducer
    ),

    mealplan: persistReducer<MealOfPlanState, UnknownAction>(
      mealofplanPersistConfig,
      mealOfPlanSlice.reducer
    ),
    mesureHistory: persistReducer<MeasureHistoryState, UnknownAction>(
      measurehistoryPersistConfig,
      measuresHistorySlice.reducer
    ),
    mesureLabo: persistReducer<MeasuresLaboState, UnknownAction>(
      measureLaboPersistConfig,
      measuresLaboSlice.reducer
    ),

    mealsOfDay: persistReducer<MealsOfDayState, UnknownAction>(
      mealsOfDayPersistConfig,
      mealsOfDaySlice.reducer
    )
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export const persistor = persistStore(store);
export default store;
