import { PeopleCategory } from '../../enums/PeopleCategoris.enum';

export interface INutritionPlanDTO {
  title: string;

  relatedDiseases: number[];

  people_related: PeopleCategory[];

  created_by: Number;
}
