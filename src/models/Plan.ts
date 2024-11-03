export interface Plan {
  id: number;
  name: string;
  tags: string[];
}

export interface NutritionPlansOfUserResponseClient {
  totalPages: number;
  userPlans: Plan[];
}

export interface NutritionPlansOfUserResponse {
  totalPages: number;
  plans: Plan[];
}

export function mapGetPlansOfUserResponse(
  response: NutritionPlansOfUserResponse
): NutritionPlansOfUserResponseClient {
  return {
    totalPages: response.totalPages,
    userPlans: response.plans
  };
}
