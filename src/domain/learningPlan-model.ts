export interface LearningPlanModel {
    numberOfDay: number;
    goal: string;
    interest: string;
    plan: {
        days: DayPlanModel[];
    };
}

export interface DayPlanModel {
    dayNumber: number;
    theme: string;
    activityTitle: string;
    materials: string[];
    steps: {
        pembukaan: string[];
        pengenalan: string[];
        kegiatan: string[];
        diskusi: string[];
        penutup: string[];
    };
    benefits: {
        iman: string;
        cognitive: string;
        language: string;
        motoric: string;
        akhlak: string;
    };
}
