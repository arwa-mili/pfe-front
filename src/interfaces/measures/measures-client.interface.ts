import { UnitMeasure } from '../../enums/UnitsMeasures.enum';
import { Measure } from '../../models/Measure';

export interface MeasureClient {
  measure_id: number;
  name: string;
  limitInf: number;
  limitSup: number;
  unit: UnitMeasure;
  max: number;
  min: number;
}

export function mapGetMeasuresLaboResponse(
  response: Measure[]
): MeasureClient[] {
  const mappedMeasures = response.map((measure) => ({
    measure_id: measure.id,
    name: measure.name,
    limitInf: measure.limitInf,
    unit: measure.unit,
    limitSup: measure.limitSup,
    max: measure.max,
    min: measure.min
  }));
  return mappedMeasures;
}
