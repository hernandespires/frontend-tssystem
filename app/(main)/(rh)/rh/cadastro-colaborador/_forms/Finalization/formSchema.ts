// import z from "zod"
// import { defaultEmptyError, defaultError } from "../defaultFormFieldErrors"

// export const formSchema = z.object({
//     department: 
//         z.enum([
//             "AUDIOVISUAL", 
//             "DESIGN", 
//             "STRATEGIC_MANAGER", 
//             "PROJECT_MANAGER", 
//             "SOCIAL_MEDIA", 
//             "TRANSLATION", 
//             "PAID_TRAFFIC", 
//             "PAID_TRAFFIC", 
//             "FINANCE", 
//             "HUMAN_RESOURCES", 
//             "MARKETING", 
//             "RESEARCH_AND_DEVELOPMENT", 
//             "SALES"
//         ], 
//             { error: defaultError("Departamento") }
//         )
//         .nonoptional(defaultEmptyError("Departamento")),
//     operation: z.enum(["_01", "_02", "_03"], { error: defaultError("Operação") }).nonoptional(defaultEmptyError("Operação")),
//     level: z.enum(["TEST", "PUPPY", "JUNIOR_EAGLE", "MID_LEVEL_EAGLE", "SENIOR_EAGLE", "JUNIOR_HIGH_EAGLE", "MID_LEVEL_HIGH_EAGLE", "MID_LEVEL_HIGH_EAGLE", "SENIOR_HIGH_LEVEL", "ASSISTANT"]).nonoptional("Nível")
// })

import z from "zod"
import { defaultEmptyError, defaultError } from "../defaultFormFieldErrors"

const HIDDEN_DEPARTMENTS = [
  "FINANCE",
  "HUMAN_RESOURCES",
  "MARKETING",
  "RESEARCH_AND_DEVELOPMENT",
  "SALES"
] as const

export const formSchema = z
  .object({
    department: z
      .enum(
        [
          "AUDIOVISUAL",
          "DESIGN",
          "STRATEGIC_MANAGER",
          "PROJECT_MANAGER",
          "SOCIAL_MEDIA",
          "TRANSLATION",
          "PAID_TRAFFIC",
          "WEB_DESIGN",
          "FINANCE",
          "HUMAN_RESOURCES",
          "MARKETING",
          "RESEARCH_AND_DEVELOPMENT",
          "SALES"
        ],
        { error: defaultError("Departamento") }
      )
      .nonoptional(defaultEmptyError("Departamento")),

    operation: z
  .enum(["_01", "_02", "_03"], { error: defaultError("Operação") })
  .or(z.literal(""))
  .optional(),


    level: z
      .enum([
        "TEST",
        "PUPPY",
        "JUNIOR_EAGLE",
        "MID_LEVEL_EAGLE",
        "SENIOR_EAGLE",
        "JUNIOR_HIGH_EAGLE",
        "MID_LEVEL_HIGH_EAGLE",
        "SENIOR_HIGH_LEVEL",
        "ASSISTANT"
      ])
      .nonoptional("Nível")
  })
  .superRefine((data, ctx) => {
    const shouldRequireOperation = !HIDDEN_DEPARTMENTS.includes(
      data.department as any
    )

    if (shouldRequireOperation && !data.operation) {
      ctx.addIssue({
        path: ["operation"],
        code: z.ZodIssueCode.custom,
        message: defaultEmptyError("Operação")
      })
    }
  })