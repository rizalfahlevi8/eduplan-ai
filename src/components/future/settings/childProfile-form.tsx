import { ChildProfileFormValues, childProfileSchema } from "@/domain/childProfile-schema";
import { ChildProfile } from "@/domain/database-models";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { useEffect } from "react";

interface ChildProfileFormProps {
  initialData: ChildProfile | null;
  onSubmit: (data: ChildProfileFormValues) => Promise<void>;
  loading: boolean;
}

export const ChildProfileForm = ({
  initialData,
  onSubmit,
  loading,
}: ChildProfileFormProps) => {
  const form = useForm<ChildProfileFormValues>({
    resolver: zodResolver(childProfileSchema),
    defaultValues: {
      age: 0,
      gender: undefined,
      hobbies: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        age: initialData.age,
        gender: initialData.gender,
        hobbies: initialData.hobbies,
      });
    }
  }, [initialData, form]);

  const isEditMode = !!initialData;

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
                <FormDescription>Masukkan umur anak Anda dalam tahun</FormDescription>
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                <FormDescription>Pilih jenis kelamin anak Anda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobi</FormLabel>
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
        <Button disabled={loading} type="submit">
          {isEditMode ? "Perbarui" : "Simpan"}
        </Button>
      </form>
    </Form>
  );
};
