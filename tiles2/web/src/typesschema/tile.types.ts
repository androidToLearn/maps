import { colorsEnum } from "../services/Enum";
import { z } from "zod";
const tilesSchema = z.object({
    color : z.enum(colorsEnum) ,
    id : z.string() ,
    createdAt : z.date(),
    updatedAt : z.date()
});

const tilesSchemaArray = z.array(z.object(tilesSchema))

export type tilesSchemaArray = z.infer<typeof tilesSchemaArray>

