import { UnitMeasure } from '../../../../enums/UnitsMeasures.enum';
import { DiseasesAndSchedulesClient } from '../../../../interfaces/diseases/userDiseasesAndSchedules.interface';
import { DISEASES_NAMES } from '../../../../utils/consts/diseasesNames/diseasesNames';
import { Data } from '../../Interfaces/Data/Data.interface';
type Measure = {
  id?: number;
  specification?: string;
  time?: string;
  iso_weekday?: number;
  measure_id?: number;
  name?: string;
  max: number;
  unit: UnitMeasure;
  min: number;
  limit_inf: number;
  limit_sup: number;
  marge?: number;
};

interface DistinctMeasure extends Measure {
  measure: string;
}

export function mapDistictMeasuresToData(measures: DistinctMeasure[]): Data[] {
  return measures.map((measure) => ({
    measure: measure.measure_id ? measure.measure_id : 0,
    name: measure.measure ? measure.measure : '',
    specification: measure.specification,
    measure_id: measure.measure_id,
    max: measure.max,
    min: measure.min,
    unit: measure.unit,
    limitInf: measure.limit_inf,
    limitSup: measure.limit_sup
  }));
}
export function getDistinctMeasuresForDisease(
  diseases: DiseasesAndSchedulesClient[],
  diseasename: string
): DistinctMeasure[] {
  return diseases.reduce((acc: DistinctMeasure[], disease) => {
    if (
      disease.diseaseName === diseasename &&
      Object.values(DISEASES_NAMES).includes(diseasename)
    ) {
      const distinctMeasures = new Set<string>();
      disease.schedule.measures.forEach((measure) => {
        //const measureKey = `${measure.name}-${measure.limit_inf}-${measure.limit_sup}`;
        const measureKey = `${measure.name}-${measure.specification}-${measure.limit_inf}-${measure.limit_sup}`;
        if (!distinctMeasures.has(measureKey)) {
          distinctMeasures.add(measureKey);
          acc.push({
            measure: measure.name,
            specification: measure.specification,
            max: measure.max,
            min: measure.min,
            unit: measure.unit,
            measure_id: measure.measure_id,
            limit_inf: measure.limit_inf,
            limit_sup: measure.limit_sup
          });
        }
        console.log(distinctMeasures);
      });
    }
    return acc;
  }, []);
}
