import { MeasureScheduled } from '../interfaces/diseases/userDiseasesAndSchedules.interface';

export interface Schedule {
  id: number;
  measures: MeasureScheduled[];
}
