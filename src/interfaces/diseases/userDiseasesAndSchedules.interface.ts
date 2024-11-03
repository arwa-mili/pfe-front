import { UnitMeasure } from '../../enums/UnitsMeasures.enum';

export interface DiseasesAndSchedules {
  id: number;
  name: string;
  schedule: Schedule;
}
export interface Schedule {
  id: number;
  measures: MeasureScheduled[];
}

export interface MeasureScheduled {
  id: number;
  specification: string;
  time: string;
  iso_weekday: number;
  measure_id: number;
  name: string;
  max: number;
  min: number;
  unit: UnitMeasure;
  limit_inf: number;
  limit_sup: number;
  marge: number;
}
export interface DiseasesAndSchedulesClient {
  diseaseid: number;
  diseaseName: string;
  schedule: Schedule;
}
export function mapGetDiseasesAndSchedulesResponse(
  response: DiseasesAndSchedules[]
): DiseasesAndSchedulesClient[] {
  const mappedDiseases = response.map((disease) => ({
    diseaseid: disease.id,
    diseaseName: disease.name,
    schedule: disease.schedule || []
  }));

  return mappedDiseases;
}
