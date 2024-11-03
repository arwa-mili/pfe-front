import { z } from 'zod';

export interface AddMealNameDto {
  prompt: string;
}
export const AddMealImageSchema = z.object({
  uri: z.string(),
  type: z.enum(['image/jpeg', 'image/png']),
  fileName: z.string()
});
