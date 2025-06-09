import { LearningPlanPdf } from "@/components/LearningPlanPdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export interface GenerateResultProps {
    data: {
        learningPlan: {
            numberOfDay: number;
            goal: string;
            interest: string;
            plan: {
                days: Array<{
                    dayNumber: number;
                    theme: string,
                    activityTitle: string,
                    materials: string[],
                    steps: {
                        pembukaan: [],
                        pengenalan: [],
                        kegiatan: [],
                        diskusi: [],
                        penutup: []
                    },
                    benefits: {
                        iman: string,
                        cognitive: string,
                        language: string,
                        motoric: string,
                        akhlak: string
                    },
                }>;
            }
        }
    }
}

export const GenerateResult = (
    { data }: GenerateResultProps
) => {
    const { learningPlan } = data;
    const { plan } = learningPlan;

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            await axios.post(`/api/learning-plan`, {
                goal: learningPlan.goal,
                interests: learningPlan.interest,
                numberOfDays: learningPlan.numberOfDay,
                planJson: learningPlan.plan
            })
            router.refresh()
            toast.success(`Rencana pembelajaran Anda berhasil disimpan`)
        } catch (error) {
            console.error(error)
            toast.error("Terjadi kesalahan saat menyimpan rencana pembelajaran. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="space-y-8">
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>Rencana Pembelajaran Anda</CardTitle>
                        <CardDescription>
                            Rencana belajar {learningPlan.numberOfDay} hari yang dipersonalisasi
                        </CardDescription>
                        <PDFDownloadLink
                            document={<LearningPlanPdf learningPlan={learningPlan} />}
                            fileName={`rencana-pembelajaran-${new Date()
                                .toISOString()
                                .replace(/[:.]/g, '-')
                                .slice(0, 16)}.pdf`}
                        >
                            {({ loading }) =>
                                <Button>{loading ? 'Menyiapkan...' : 'Download PDF'}</Button>
                            }
                        </PDFDownloadLink>
                        <Button onClick={onSubmit} disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan Rencana"}
                        </Button>
                    </div>
                    <div className="mt-4">
                        <div className="text-sm font-semibold mb-2">Ketertarikan:</div>
                        <div className="text-lg">{learningPlan.interest}</div>
                    </div>
                    <div className="mt-4">
                        <div className="text-sm font-semibold mb-2">Tujuan:</div>
                        <div className="text-lg">{learningPlan.goal}</div>
                    </div>
                </CardHeader>
            </Card>

            <div className="space-y-6">
                {plan.days.map((day) => (
                    <DayCard key={day.dayNumber} day={day} />
                ))}
            </div>
        </div>
    );
}

const DayCard = ({ day }: { day: GenerateResultProps['data']['learningPlan']['plan']['days'][0] }) => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                Day {day.dayNumber}
            </CardTitle>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Tema Spesifik Harian</h3>
                    <p className="text-sm">{day.theme}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Judul Kegiatan</h3>
                    <p className="text-sm">{day.activityTitle}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Alat dan Bahan (Daftar untuk Hari Ini)</h3>
                    <ul className="list-disc pl-4">
                        <ul className="list-disc pl-4">
                            {day.materials.map((material, idx) => (
                                <li key={idx} className="text-sm">{material}</li>
                            ))}
                        </ul>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Langkah-Langkah Pembelajaran</h3>
                    <h4 className="font-medium mb-2">1. Pembukaan :</h4>
                    <ul className="list-disc pl-4">
                        <ul className="list-disc pl-4">
                            {day.steps.pembukaan.map((pembukaan, idx) => (
                                <li key={idx} className="text-sm">{pembukaan}</li>
                            ))}
                        </ul>
                    </ul>
                    <h4 className="font-medium mb-2">2. Pengenalan Tema :</h4>
                    <ul className="list-disc pl-4">
                        <ul className="list-disc pl-4">
                            {day.steps.pengenalan.map((pengenalan, idx) => (
                                <li key={idx} className="text-sm">{pengenalan}</li>
                            ))}
                        </ul>
                    </ul>
                    <h4 className="font-medium mb-2">3. Kegiatan :</h4>
                    <ul className="list-disc pl-4">
                        <ul className="list-disc pl-4">
                            {day.steps.kegiatan.map((kegiatan, idx) => (
                                <li key={idx} className="text-sm">{kegiatan}</li>
                            ))}
                        </ul>
                    </ul>
                    <h4 className="font-medium mb-2">4. Diskusi :</h4>
                    <ul className="list-disc pl-4">
                        <ul className="list-disc pl-4">
                            {day.steps.diskusi.map((diskusi, idx) => (
                                <li key={idx} className="text-sm">{diskusi}</li>
                            ))}
                        </ul>
                    </ul>
                    <h5 className="font-medium mb-2">5. Penutup :</h5>
                    <ul className="list-disc pl-4">
                        <ul className="list-disc pl-4">
                            {day.steps.penutup.map((penutup, idx) => (
                                <li key={idx} className="text-sm">{penutup}</li>
                            ))}
                        </ul>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Manfaat & Tujuan Pembelajaran</h3>
                    <ul className="list-disc pl-4">
                        <ul className="list-disc pl-4">
                            <li className="text-sm"> <b>Aspek Iman: </b> <br /> {day.benefits.iman}</li>
                            <li className="text-sm"> <b>Aspek Kognitif: </b> <br /> {day.benefits.cognitive}</li>
                            <li className="text-sm"> <b>Aspek Bahasa: </b> <br /> {day.benefits.language}</li>
                            <li className="text-sm"> <b>Aspek Motorik (Halus): </b> <br /> {day.benefits.motoric}</li>
                            <li className="text-sm"> <b>Aspek Akhlak/Sosial-Emosional: </b> <br /> {day.benefits.akhlak}</li>
                        </ul>
                    </ul>
                </div>
            </CardContent>
        </CardHeader>
    </Card>
);