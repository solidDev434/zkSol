import { z } from "zod";

export const zkMintSchema = z.object({
    tkName: z
        .string()
        .nonempty({ message: "Please fill in the Token Name" }),
    tkSymbol: z
        .string()
        .nonempty({ message: "Please fill in the Token Symbol" }),
    amount: z
        .string()
        .regex(/^\d{1,}$/, { 
            message: "Please fill in a valid Token Amount" 
        }),
    decimals: z
        .string()
        .regex(/^\d{1}$/, {
            message: "Add a valid Token Decimal Precision"
        }),
    tkURI: z
        .string()
        .nonempty({ message: "Please add the Token Image or Metadata" }),
    attributes: z
        .array(
          z.object({
            key: z.string().nonempty("Attribute key is required"),
            value: z.string().nonempty("Attribute value is required"),
          })
        )
        .optional().default([]),
});