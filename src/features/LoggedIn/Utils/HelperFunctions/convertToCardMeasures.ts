import { MeasureClient } from '../../../../interfaces/measures/measures-client.interface';
import { MeasureCardAttributes } from './getEveryMeasureLastValue';
export function convertToMeasureClientArray(
  measures: MeasureClient[]
): MeasureCardAttributes[] {
  return measures.map((measure) => ({
    measure_id: measure.measure_id,
    limitInf: measure.limitInf,
    measure: null,
    name: measure.name,
    unit: measure.unit,
    lastMeasured: '',
    limitSup: measure.limitSup,
    max: measure.min,
    min: measure.max
  }));
}
