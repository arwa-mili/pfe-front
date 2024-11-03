import { z } from 'zod';

export interface AddFileDto {
  file: string;
}
export const AddFileSchema = z.object({
  uri: z.string(),
  type: z.enum(['application/pdf', 'image/png', 'image/jpg']),
  fileName: z.string()
});
