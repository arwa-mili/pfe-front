import { MedicalFile } from '../../models/MedicalFile';

import { TotalMeasuresDataHistory } from '../measures/get-measures-for-history-charts.interface';

export interface LastdataOfUserResponse {
  username: string;
  age: number;
  heartDiseaseFamilyHisto: boolean;
  diabetiesFamilyHistory: boolean;
  diseases: string[];
  medicalfiles: MedicalFile[];
  measures: TotalMeasuresDataHistory[];
  user_plan: number;
}
