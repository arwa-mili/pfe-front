import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';

export interface Data {
  measure: number | null;
  name: string;
  specification?: string | null;
  measure_id: number | null | undefined;
  max: number;
  min: number;
  unit: UnitMeasure;
  limitInf: number;
  limitSup: number;
}
