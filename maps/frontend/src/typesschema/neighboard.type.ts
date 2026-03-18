import { object, z } from "zod";

export const schoolSchema = z
  .object({
    id: z.number(),
    type: z.string(),
    name: z.string(),
    address: z.string(),
    total_students: z.number(),
    shelter_area: z.number(),
    shelter_3_capacity: z.number(),
    shelter_3_overflow: z.number(),
    shelter_4_capacity: z.number(),
    shelter_4_overflow: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    neighborhood: z.string(),
  })
  .strict();

export const propery = z
  .object({
    STATUS: z.string(),
    oidshchuna: z.number(),
    msshchuna: z.number(),
    dateimport: z.string(),
    ShapeArea: z.number(),
    shemshchun: z.string(),
    UniqueId: z.string(),
    schools: z.array(schoolSchema),
  })
  .strict();

export const objectGeometry = z
  .object({
    type: z.string().optional(),
    coordinates: z.array(z.array(z.array(z.number()))),
  })
  .strict();

export const objectShchuna = z
  .object({
    type: z.string(),
    properties: propery,
    geometry: objectGeometry,
  })
  .strict();

export const objectCrs = z
  .object({
    type: z.string(),
    properties: object({ name: z.string() }),
  })
  .strict();

export const allJson = z
  .object({
    type: z.string(),
    name: z.string(),
    crs: objectCrs,
    features: z.array(objectShchuna),
  })
  .strict();

export const properties = z.array(propery)

export const shchunot = z.array(objectShchuna);

export type theJsonShchunot = z.infer<typeof shchunot>;
export type objectShchunaType = z.infer<typeof objectShchuna>;
export type objectMosadType = z.infer<typeof schoolSchema>;

