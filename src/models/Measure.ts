import { UnitMeasure } from '../enums/UnitsMeasures.enum';
export interface Measure {
  id: number;
  name: string;
  unit: UnitMeasure;
  limitInf: number;
  limitSup: number;
  min: number;
  max: number;
  measureType: string;
  marge: number;
}
