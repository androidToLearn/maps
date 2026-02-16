
import { z } from "zod";
export const usersSchema = z.object({
    name : z.string() ,
    email : z.string() ,
    role : z.string() ,
    _id : z.string()
});

export const usersSchemaArray = z.array(usersSchema)

