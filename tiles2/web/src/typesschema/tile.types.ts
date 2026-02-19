import { colorsEnum } from "../types/EnumColors";
import { z } from "zod";
const tilesSchema = z.object({
  color: z.nativeEnum(colorsEnum),
  _id: z.string(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const tilesSchemaArray = z.array(tilesSchema);
//[{_id: '6991b13dde785b9e565cf2ba', id: '6991b13dde785b9e565cf2b9', color: 'rgba(236, 205, 136, 1)', createdAt: '2026-02-15T08:49:13.429Z', updatedAt: '2026-02-15T11:42:53.659Z'}]
