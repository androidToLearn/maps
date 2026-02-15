
import { z } from "zod";
export const usersSchema = z.object({
    name : z.string() ,
    email : z.string() ,
    age : z.number()
});

const usersSchemaArray = z.array(z.object(usersSchema))

export type usersSchemaArray = z.infer<typeof usersSchemaArray>