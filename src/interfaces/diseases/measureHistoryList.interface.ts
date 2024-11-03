export interface MeasureHistoryList {
  created_at: string;
  updated_at: string;
  id: number;
  specification: string;
  userid: number;
  measure_name: string;
  value: number;
}

export interface MeasureHistoryListClient {
  createdAt: string;
  updatedAt: string;
  id: number;
  specification: string;
  measureName: string;
  value: number;
}

export function mapGetMeasureHistoryResponse(
  response: MeasureHistoryList[]
): MeasureHistoryListClient[] {
  const mappedResponse = response.map((measureH) => ({
    createdAt: measureH.created_at,
    updatedAt: measureH.updated_at,
    id: measureH.id,
    specification: measureH.specification,
    measureName: measureH.measure_name,
    value: measureH.value
  }));

  return mappedResponse;
}
