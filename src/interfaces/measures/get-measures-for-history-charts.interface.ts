import { MeasureHistoryList } from '../diseases/measureHistoryList.interface';

export interface TotalMeasuresDataHistory {
  measureid: number;
  measures_hist: MeasureHistoryList[];
}

export interface MeasureHistoryListForChartClient {
  created_at: string;
  id: number;
  specification: string;
  measure_name: string;
  value: number;
}

export interface TotalMeasuresDataClient {
  measurename: number;
  measures_hist: MeasureHistoryListForChartClient[];
}

export function mapTotalMeasuresForHistoryUserResponse(
  response: TotalMeasuresDataHistory[]
): TotalMeasuresDataClient[] {
  return response.map((measure) => ({
    measurename: measure.measureid,
    measures_hist: measure.measures_hist.map((mes) => ({
      id: mes.id,
      created_at: mes.created_at,
      specification:
        mes.specification /*assignSpecification(mes.specification)*/,
      measure_name: mes.measure_name,
      value: mes.value
    }))
  }));
}
