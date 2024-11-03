import { HasSportActivity } from '../enums/SportActivity.enum';
import { Role } from '../enums/UserRole.enum';
export interface User {
  id: number;
  email: string;
  name: string;
  BMI: number;
  sport_activity: HasSportActivity;
  surname: string;
  weight: number;
  height: number;
  phoneNumber: number;
  gender: number | boolean;
  birthdate: string;
  age: number;
  diseases: number[];
  weekly_calories: number;
  weekly_fats: number;
  weekly_carbohydrates: number;
  current_plan: null | number;
  weekly_protein: number;
  role: Role;
  avatar: string;
  password?: string;
  historydiabeties?: boolean;
  historycardio?: boolean;
}

export interface EditProfileRequest {
  id?: number;
  email?: string;
  phoneNumber?: number;
  name?: string;
  surname?: string;
  gender?: number | null;
  height?: number;
  weight?: number;
  sport_Activity?: number;
  password?: number;
  role?: number;
  avatar?: string;
  birthdate?: string;
  historyDiabeties?: number;
  historyHeartDisease?: number;
}
