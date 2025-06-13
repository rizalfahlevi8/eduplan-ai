import * as z from "zod"

export const childProfileSchema = z.object({
    age: z.coerce.number().min(0, "Usia tidak boleh kurang dari 0"),
    gender: z.enum(["MALE", "FEMALE"], {
        required_error: "Jenis kelamin harus dipilih",
        invalid_type_error: "Jenis kelamin tidak valid"
    }),
    hobbies: z.string().min(1, "Minimal pilih satu hobi")
})

export type ChildProfileFormValues = z.infer<typeof childProfileSchema>
