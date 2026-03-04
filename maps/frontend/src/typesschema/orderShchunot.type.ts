import { z } from "zod";

export const schoolSchema = z
  .object({
    id: z.number().optional(),
    type: z.string().optional(),
    name: z.string().optional(),
    address: z.string().optional(),
    total_students: z.number().optional(),
    shelter_area: z.number().optional(),
    shelter_3_capacity: z.number().optional(),
    shelter_3_overflow: z.number().optional(),
    shelter_4_capacity: z.number().optional(),
    shelter_4_overflow: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    neighborhood: z.string().optional(),
  })
  .strict();
export const objectShcuna = z.object({
  name: z.string(),
  schools: z.array(schoolSchema),
  id: z.string(),
});

export const objectPolyon = z.object({
  id: z.string(),
  coordinates: z.array(z.array(z.array(z.number()))),
  isClicked: z.boolean(),
});
export const allOrderedShcunotSchema = z.object({
  shchunot: z.array(objectShcuna),
  polygons: z.array(objectPolyon),
});

export type allOrderedShcunotType = z.infer<typeof allOrderedShcunotSchema>;
