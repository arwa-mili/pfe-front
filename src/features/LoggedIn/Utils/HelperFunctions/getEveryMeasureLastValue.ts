import { MeasureHistoryListClient } from '../../../../interfaces/diseases/measureHistoryList.interface';
import { Data } from '../../Interfaces/Data/Data.interface';

export interface MeasureCardAttributes extends Data {
  lastMeasured: string;
}

export function getEveryMeasureLastValue(
  measure: Data[],
  measureHistory: MeasureHistoryListClient[]
): MeasureCardAttributes[] {
  const result: MeasureCardAttributes[] = [];

  for (const measureData of measure) {
    let minDate: Date | null = null;
    let value: number | null = null;
    let lastMeasured: string = '';

    for (const historyData of measureHistory) {
      if (
        historyData.measureName === measureData.name &&
        historyData.specification === measureData.specification
      ) {
        const date = new Date(historyData.createdAt);
        if (!minDate || date > minDate) {
          minDate = date;
          value = historyData.value;
          lastMeasured = historyData.createdAt;
        }
      }
    }

    if (
      minDate !== undefined &&
      value !== undefined &&
      lastMeasured !== undefined
    ) {
      const measureCard: MeasureCardAttributes = {
        ...measureData,
        lastMeasured: lastMeasured,
        measure: value
      };
      //console.log('ee', measureCard);
      result.push(measureCard);
    }
  }

  return result;
}
