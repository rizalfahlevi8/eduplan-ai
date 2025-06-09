export function cleanAndParseResponse(result: string, numberOfDays: number) {
    const cleanJsonString = result
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '')
        .trim();

    console.log('Cleaned JSON string:', cleanJsonString);

    const parsed = JSON.parse(cleanJsonString);

    if (!parsed.days || !Array.isArray(parsed.days)) {
        throw new Error("Invalid response structure");
    }

    while (parsed.days.length < numberOfDays) {
        const dayNumber = parsed.days.length + 1;
        parsed.days.push({
            dayNumber,
            theme: `Tema Hari ke-${dayNumber}`,
            activityTitle: "Judul Kegiatan Default",
            materials: ["Contoh Material 1", "Contoh Material 2"],
            steps: {
                pembukaan: ["Buka dengan doa dan basmalah"],
                pengenalan: ["Kenalkan tema hari ini"],
                kegiatan: ["Langkah-langkah kegiatan"],
                diskusi: ["Pertanyaan diskusi sederhana"],
                penutup: ["Penutup kegiatan dengan doa"]
            },
            benefits: {
                iman: "Manfaat iman default",
                cognitive: "Manfaat kognitif default",
                language: "Manfaat bahasa default",
                motoric: "Manfaat motorik default",
                akhlak: "Manfaat akhlak default"
            },
        });
    }

    return parsed.days.slice(0, numberOfDays);
}