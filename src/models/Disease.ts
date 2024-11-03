import { Schedule } from './Schedule';

export interface Disease {
  id: number;
  name: string;
  schedules: Schedule[];
}
