import { z } from "zod";

// export function validateWithZod() {
export const schemaRegister = z.object({
  password: z
    .string()
    .min(8, { message: "הסיסמה חייבת להכיל לפחות 8 תווים" })
    .refine((val: any) => /[A-Z]/.test(val), {
      message: "חייבת להכיל לפחות אות גדולה אחת (A-Z)",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "חייבת להכיל לפחות אות קטנה אחת (a-z)",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "חייבת להכיל לפחות ספרה אחת (0-9)",
    })
    .refine((val) => /[!@#$%^&*()_\-+\[\]{};':"\\|,.<>\/?`~]/.test(val), {
      message: "חייבת להכיל לפחות תו מיוחד אחד (למשל !@#$%)",
    }),
  name: z
    .string()
    .min(2, "שם צריך להיות 2 תווים לפחות")
    .max(35, "שם צריך להיות לא יותר מ35 תווים"),
  email: z
    .string()
    .email("יש להזין אימייל תקין")
    .regex(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")),
});

export type register = z.infer<typeof schemaRegister>;

export const schemaSignIn = z.object({
  password: z
    .string()
    .min(8, { message: "הסיסמה חייבת להכיל לפחות 8 תווים" })
    .refine((val: any) => /[A-Z]/.test(val), {
      message: "חייבת להכיל לפחות אות גדולה אחת (A-Z)",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "חייבת להכיל לפחות אות קטנה אחת (a-z)",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "חייבת להכיל לפחות ספרה אחת (0-9)",
    })
    .refine((val) => /[!@#$%^&*()_\-+\[\]{};':"\\|,.<>\/?`~]/.test(val), {
      message: "חייבת להכיל לפחות תו מיוחד אחד (למשל !@#$%)",
    }),
  email: z
    .string()
    .email("יש להזין אימייל תקין")
    .regex(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")),
});
export type SignIn = z.infer<typeof schemaSignIn>;

//Zz#00000
//   return passwordSchema;
// }
/*, */
