import { Role } from '../../enums/UserRole.enum';
import { User } from '../../models/User';

export interface IProfileEditResonseClient {
  email?: string;
  phoneNumber?: number;
  firstName?: string;
  familyName?: string;
  gender?: string;
  age: number;
  role: Role;
  height?: number;
  weight?: number;
  avatar?: string;
  BMI?: number;
  weekly_calories: number;
  weekly_carbohydrates: number;
  weekly_fats: number;
  weekly_protein: number;
  birthdate?: string;
  sport_Activity: number;
}

export function mapEditProfileResponse(
  response: User
): IProfileEditResonseClient {
  return {
    avatar: response.avatar,
    familyName: response.surname,
    firstName: response.name,
    height: response.height,
    sport_Activity: response.sport_activity,
    weight: response.weight,
    birthdate: response.birthdate,
    email: response.email,
    age: response.age,
    role: response.role,
    BMI: response.BMI,
    weekly_calories: response.weekly_calories,
    weekly_carbohydrates: response.weekly_carbohydrates,
    weekly_fats: response.weekly_fats,
    weekly_protein: response.weekly_protein,
    phoneNumber: response.phoneNumber,
    gender: response.gender === 1 ? 'Man' : 'Woman'
  };
}
