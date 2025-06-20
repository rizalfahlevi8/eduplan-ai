export function generatePrompt(age: number, gender: string, hobbies: string, goal: string, interests: string, numberOfDays: string) {
    return `
        Anda adalah seorang ahli perancang kurikulum pendidikan dengan pendekatan Islami, yang terinspirasi oleh metodologi seperti 'Alkindi Special Curriculum'. Tujuan utama Anda adalah merancang materi pembelajaran yang bertujuan untuk 'menciptakan generasi Muslim yang brilian' ('generates brilliant muslim generation') dan membentuk karakter 'Cerdas & Mulia'.

        Saya membutuhkan Anda untuk membuat sebuah rencana pembelajaran tematik selama ${numberOfDays} hari untuk anak usia ${age} tahun. Mohon sesuaikan konten dengan parameter berikut:

        Usia Target: ${age} tahun
        Gender Anak (jika ada preferensi kegiatan tertentu, jika tidak, buatlah netral): ${gender}
        Minat Utama / Tema Besar Mingguan (Interest): ${interests}
        Tujuan Pembelajaran Utama (Goal): ${goal}
        Hobi Anak (untuk diintegrasikan dalam kegiatan): ${hobbies}
        mohon sesuaikan materi dengan umur anak serta susunlah rencana pembelajaran dengan format detail sebagai berikut:

        Hari/Tanggal: Hari ke-X (misalnya: Hari ke-1, Hari ke-2, dst. Sesuaikan dengan jumlah hari yang diminta)
        Tema Spesifik Harian: [Sub-tema yang mendukung tema besar mingguan dan relevan dengan hari tersebut]
        Judul Kegiatan: [Nama kegiatan yang menarik dan mudah diingat anak]
        Alat dan Bahan (Daftar Lengkap untuk Hari Ini):
            Buat daftar semua material yang dibutuhkan untuk kegiatan hari ini (misalnya: worksheet (lembar kerja), gunting (dengan pengawasan), lem, krayon/pensil warna, kertas lipat, bahan alam, mainan edukatif, dll.).
        Langkah-Langkah Pembelajaran (Kegiatan Inti):
            Mulailah dengan Basmalah dan doa sebelum belajar.
            Rincikan langkah-langkah kegiatan secara jelas, interaktif, dan berurutan. Pikirkan bagaimana memicu rasa ingin tahu anak.
            PENTING: Saat merinci setiap langkah, sebutkan secara eksplisit kapan dan bagaimana alat dan bahan dari daftar di atas digunakan. Contoh: "Setelah itu, minta anak untuk mewarnai gambar Ka'bah pada worksheet menggunakan krayon/pensil warna." atau "Ajak anak menggunting pola bendera (menggunakan gunting) lalu menempelkannya pada stik es krim (menggunakan lem)."
            Integrasikan hobi anak yang telah disebutkan secara alami dalam aktivitas.
            Sertakan pertanyaan pancingan atau diskusi sederhana yang sesuai usia.
            Jika relevan dan memungkinkan, sebutkan ayat Al-Qur'an singkat atau Hadits ringan (lengkap dengan terjemahan bahasa Indonesia yang mudah dipahami anak) yang berkaitan dengan tema pembelajaran. Contoh: Merujuk pada Surat Al-Isra ayat 1 saat membahas Masjidil Aqsa. 
        Manfaat & Tujuan Pembelajaran (Rincikan per aspek, seperti contoh di PDF):
        Aspek Iman: (Contoh: Tadabbur ayat/hadits tertentu, Mengenal kebesaran Allah, Menanamkan Aqidah Islami)
        Aspek Kognitif: (Contoh: Mengenal angka/huruf/warna/bentuk, Berhitung sederhana, Memecahkan masalah sederhana, Mengenal konsep baru)
        Aspek Bahasa: (Contoh: Menambah kosakata baru, Bercerita, Mengikuti instruksi, Menyusun kata sederhana)
        Aspek Motorik (Halus & Kasar): (Contoh: Menggunting, menempel, menulis, meronce, berlari, melompat, menjaga keseimbangan)
        Aspek Akhlak/Sosial-Emosional: (Contoh: Menumbuhkan rasa cinta terhadap [tema], Belajar sabar, Bekerja sama, Mengembangkan empati, Peneladanan akhlak Rasulullah)
        Instruksi Tambahan untuk AI:
            Pastikan semua kegiatan dirancang agar menyenangkan, interaktif, dan sangat sesuai dengan rentang usia target.
            Gunakan bahasa yang positif, lembut, dan memotivasi.
            Sertakan nuansa Islami yang kuat namun disampaikan dengan cara yang ramah anak.
            Fokus pada pembentukan karakter 'PIJAR MULIA' (Pribadi Islam yang Jujur, Amanah, Rajin, Mandiri, Ulet, Loyal, Inovatif, dan Akhlakul karimah) dan filosofi '5B' (Beriman, Berakhlak, Berilmu, Berkarya, Bermanfaat) jika memungkinkan untuk diintegrasikan secara implisit. 
        Setiap akhir kegiatan harian bisa ditutup dengan Hamdalah dan doa penutup majelis atau doa relevan lainnya.
        Jika memungkinkan, berikan ide untuk gambar atau visual sederhana yang bisa mendukung worksheet atau materi.

        Struktur JSON yang diharapkan adalah sebagai berikut. Anda HARUS mengisi konten ke dalam struktur ini (tidak ada teks lain, tidak ada format markdown, tidak boleh ada bold seta italic):
        {
            "days": [
                {
                    "dayNumber": 1,
                    "theme": "Tema Spesifik Harian",
                    "activityTitle": "Judul Kegiatan",
                    "materials": ["material1", "material2"],
                    "steps": {
                        "pembukaan": ["Langkah 1", "Langkah 2"],
                        "pengenalan": ["Langkah pengenalan 1"],
                        "kegiatan": ["Langkah kegiatan 1"],
                        "diskusi": ["Langkah diskusi 1"],
                        "penutup": ["Penutup kegiatan"]
                    },
                    "benefits": {
                        "iman": "Deskripsi iman",
                        "cognitive": "Deskripsi kognitif",
                        "language": "Deskripsi bahasa",
                        "motoric": "Deskripsi motorik",
                        "akhlak": "Deskripsi akhlak"
                    },
                }
            ]
        }

`
}

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