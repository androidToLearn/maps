import { z } from "zod";

const colorsSchma = z.enum(['red' , 'yellow' , 'orange'])

export type colorsType = z.infer<typeof colorsSchma>;

