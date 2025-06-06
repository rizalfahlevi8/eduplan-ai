"use client"

import * as z from "zod"
import axios from "axios"
import { ChildProfile } from "@/generated/prisma"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface ChildProfileFormProps {
    initialData: ChildProfile | null 
}

const formSchema = z.object({
    age: z.coerce.number().min(0, "Usia tidak boleh kurang dari 0"),
    gender: z.enum(["MALE", "FEMALE"], {
        required_error: "Jenis kelamin harus dipilih",
        invalid_type_error: "Jenis kelamin tidak valid"
    }),
    hobbies: z.string().min(1, "Minimal pilih satu hobi")
})

type ChildProfileFormValues = z.infer<typeof formSchema>

export const ChildProfileForm = ({ initialData }: ChildProfileFormProps) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const form = useForm<ChildProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            age: initialData.age,
            gender: initialData.gender,
            hobbies: initialData.hobbies
        } : {
            age: 0,
            gender: undefined,
            hobbies: ""
        }
    });

    const isEditMode = !!initialData;

    const onSubmit = async (data: ChildProfileFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/child-profile`, data)
            } else {
                await axios.post(`/api/child-profile`, data)
            }
            router.refresh()
            toast.success(`Profil anak Anda berhasil ${initialData ? "diperbarui" : "disimpan"}`)
        } catch (error) {
            console.error(error)
            toast.error("Cek kembali data yang diinput")
        } finally {
            setLoading(false)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="flex flex-col space-y-6">
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Umur</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} {...field} className="max-w-lg" />
                                </FormControl>
                                <FormDescription>
                                    Masukkan umur anak Anda dalam tahun
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jenis Kelamin</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Jenis Kelamin" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MALE">Laki-laki</SelectItem>
                                        <SelectItem value="FEMALE">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Pilih jenis kelamin anak Anda
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hobbies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hobby</FormLabel>
                                <FormControl>
                                    <Input type="text" disabled={loading} {...field} className="max-w-lg" />
                                </FormControl>
                                <FormDescription>
                                    Masukkan hobi anak Anda, pisahkan dengan koma
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    disabled={loading}
                    type="submit"
                >
                    {isEditMode ? "Perbarui" : "Simpan"}
                </Button>
            </form>
        </Form>
    );
}
