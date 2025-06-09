'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast from "react-hot-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { generatePrompt } from "@/lib/prompts"
import { ChildProfile} from "@/generated/prisma"
import { cleanAndParseResponse } from "@/lib/parseReturnPrompts"

interface GenerateFormProps {
    initialData: ChildProfile;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDataGenerated: (data: any) => void;
}

const formSchema = z.object({
    interest: z.string().min(1),
    goal: z.string().min(1),
    numberOfDay: z.number().min(1)
})

type GenerateFormValues = z.infer<typeof formSchema>

export const GenerateForm = ({ initialData, onDataGenerated }: GenerateFormProps) => {

    const [loading, setLoading] = useState(false)

    const form = useForm<GenerateFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            interest: "",
            goal: "",
            numberOfDay: 1
        }
    })

    const onSubmit = async (data: GenerateFormValues) => {
        try {
            setLoading(true)
            const prompt = generatePrompt(initialData.age, initialData.gender, initialData.hobbies, data.goal, data.interest, String(data.numberOfDay));
            const response = await fetch("/api/gemini-api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt
                }),
            });
            const dataResponse = await response.json();

            if (!response.ok) {
                throw new Error(dataResponse.error || "Something went wrong");
            }

            const parsedPlan = cleanAndParseResponse(dataResponse.result, Number(data.numberOfDay));
            // console.log("Parsed Plan:", parsedPlan);

            const formattedData = {
                learningPlan: {
                    numberOfDay: data.numberOfDay,
                    goal: data.goal,
                    interest: data.interest,
                    plan: { days: parsedPlan }
                }
            };

            onDataGenerated(formattedData);
            toast.success("Rencana pembelajaran berhasil dibuat!");
        } catch (error) {
            console.error(error)
            toast.error("Gagal membuat rencana pembelajaran yang valid. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Create Learning Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-6 mb-4">

                            {/* Jumlah Hari */}
                            <FormField
                                control={form.control}
                                name="numberOfDay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jumlah Hari</FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            defaultValue={String(field.value)}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Pilih jumlah hari" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num} Hari
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Pilih jumlah hari untuk digenerate
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Ketertarikan */}
                            <FormField
                                control={form.control}
                                name="interest"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ketertarikan</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Mengenal Nabi Muhammad SAW"
                                                {...field}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Masukkan ketertarikan anak Anda
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Tujuan */}
                            <FormField
                                control={form.control}
                                name="goal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tujuan</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Membantu anak dalam belajar membaca"
                                                {...field}
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Masukkan tujuan pembelajaran
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
                            {loading ? "Generating..." : "Generate Learning Plan"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
