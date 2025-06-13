import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GenerateFormSchema, GenerateFormValues } from "@/domain/generateForm-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface GenerateFormProps {
    onSubmit: (data: GenerateFormValues) => Promise<void>;
    loading: boolean;
}

export const GenerateForm = ({ onSubmit, loading}: GenerateFormProps) => {
    const form = useForm<GenerateFormValues>({
        resolver: zodResolver(GenerateFormSchema),
        defaultValues: {
            interest: "",
            goal: "",
            numberOfDay: 1
        }
    })
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
    );

}