

import { z } from "zod";
export const tokenSchema = z.object({
  message: z.string(),
  id: z.string(),
  role: z.string(),
  name: z.string(),
});
