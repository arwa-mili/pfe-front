import { AddMeasureHistoryDTO } from '../../../interfaces/diseases/addMeasureHistoryDto.interface';
import {
  mapGetMeasureHistoryResponse,
  MeasureHistoryList,
  MeasureHistoryListClient
} from '../../../interfaces/diseases/measureHistoryList.interface';
import {
  DiseasesAndSchedules,
  DiseasesAndSchedulesClient,
  mapGetDiseasesAndSchedulesResponse
} from '../../../interfaces/diseases/userDiseasesAndSchedules.interface';
import { MeasuresLaboDto } from '../../../interfaces/measures/measure-labo-criteriadto.interface';
import {
  mapGetMeasuresLaboResponse,
  MeasureClient
} from '../../../interfaces/measures/measures-client.interface';
import { Measure } from '../../../models/Measure';

import {
  TotalMeasuresDataHistory,
  TotalMeasuresDataClient,
  mapTotalMeasuresForHistoryUserResponse
} from '../../../interfaces/measures/get-measures-for-history-charts.interface';
import {
  AddMeasureToHistory,
  deleteMeasureHistory,
  findLaboMeasures,
  GetMeasureHistoryOfUser,
  GetUserDiseasesAndSchedules,
  getUserTotalMeasuresForchart
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';

export const measuresApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    findLaboMeasures: builder.query<
      MeasureClient[],
      { measureCriteriaDto: MeasuresLaboDto }
    >({
      query: ({ measureCriteriaDto }) => ({
        url: findLaboMeasures.replace(
          ':measureType',
          measureCriteriaDto.measureType.toString()
        ),
        method: 'GET'
      }),
      transformResponse: (response: Measure[]) =>
        mapGetMeasuresLaboResponse(response),
      providesTags: ['MeasuresBilan']
    }),
    AddMeasureToHistory: builder.mutation<
      void,
      {
        userid: number;
        mesid: number;
        addMeasuretoHistoryDTO: AddMeasureHistoryDTO;
      }
    >({
      query: ({ userid, mesid, addMeasuretoHistoryDTO }) => ({
        url: AddMeasureToHistory.replace(':userid', userid.toString()).replace(
          ':mesid',
          mesid.toString()
        ),

        method: 'POST',
        body: addMeasuretoHistoryDTO
      }),

      invalidatesTags: ['MeasureHistory']
    }),
    GetMeasureHistoryOfUser: builder.query<
      MeasureHistoryListClient[],
      { userid: number }
    >({
      query: ({ userid }) => ({
        url: GetMeasureHistoryOfUser.replace(':userid', userid.toString()),
        method: 'GET'
      }),
      extraOptions: { maxRetries: 10 },
      transformResponse: (response: MeasureHistoryList[]) =>
        mapGetMeasureHistoryResponse(response),

      providesTags: ['MeasureHistory']
    }),
    GetUserDiseasesAndSchedules: builder.query<
      DiseasesAndSchedulesClient[],
      { userid: number }
    >({
      query: ({ userid }) => ({
        url: GetUserDiseasesAndSchedules.replace(':userid', userid.toString()),
        method: 'GET'
      }),
      transformResponse: (response: DiseasesAndSchedules[]) =>
        mapGetDiseasesAndSchedulesResponse(response)
    }),

    getUserTotalMeasuresForchart: builder.query<
      TotalMeasuresDataClient[],
      { userid: number }
    >({
      query: ({ userid }) => ({
        url: getUserTotalMeasuresForchart.replace(':userid', userid.toString()),
        method: 'GET'
      }),
      transformResponse: (response: TotalMeasuresDataHistory[]) =>
        mapTotalMeasuresForHistoryUserResponse(response)
    }),

    deleteMeasureHistory: builder.mutation<
      void,
      { userid: number; mes_history_id: number }
    >({
      query: ({ mes_history_id, userid }) => ({
        url: deleteMeasureHistory
          .replace(':userid', userid.toString())
          .replace(':mes_history_id', mes_history_id.toString()),
        method: 'DELETE'
      }),
      invalidatesTags: ['MeasureHistory']
    })
  })
});

export const {
  useLazyFindLaboMeasuresQuery,
  useAddMeasureToHistoryMutation,
  useDeleteMeasureHistoryMutation,
  useGetMeasureHistoryOfUserQuery,
  useLazyGetUserDiseasesAndSchedulesQuery,
  useLazyGetUserTotalMeasuresForchartQuery
} = measuresApiSlice;
