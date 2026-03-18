import { z } from "zod";

export const numberSchem = z.object({amount : z.string().min(1)})

export type numnberTypeForm = z.infer<typeof numberSchem>;