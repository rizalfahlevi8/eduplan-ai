"use client";

import { LearningPlan } from "@/generated/prisma";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LearningPlanContextType {
    learningPlans: LearningPlan[];
    refetch: () => Promise<void>;
    deletePlan: (id: string) => Promise<void>;
}

const LearningPlanContext = createContext<LearningPlanContextType | undefined>(undefined);

export function LearningPlanProvider({ children }: { children: React.ReactNode }) {
    const { getToken, isLoaded } = useAuth();
    const [learningPlans, setLearningPlans] = useState<LearningPlan[]>([]);

    const fetchLearningPlans = async () => {
        if (!isLoaded) return;
        try {
            const token = await getToken();
            if (!token) return;

            const resLearningPlan = await axios.get('/api/learning-plan', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLearningPlans(resLearningPlan.data);
        } catch (err) {
            console.error("[FETCH_LEARNING_PLANS_ERROR]", err);
        }
    };

    const deletePlan = async (id: string) => {
        if (!isLoaded) return;
        try {
            const token = await getToken();
            if (!token) return;

            await axios.delete(`/api/learning-plan/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLearningPlans(prev => prev.filter(plan => plan.id !== id));
            toast.success("Rencana pembelajaran berhasil dihapus");
        } catch (err) {
            console.error("[DELETE_LEARNING_PLAN_ERROR]", err);
            toast.error("Gagal menghapus rencana pembelajaran");
        }
    };

    useEffect(() => {
        fetchLearningPlans();
    }, [isLoaded]);

    return (
        <LearningPlanContext.Provider value={{ learningPlans, refetch: fetchLearningPlans, deletePlan }}>
            {children}
        </LearningPlanContext.Provider>
    );
}

export function useLearningPlans() {
    const context = useContext(LearningPlanContext);
    if (context === undefined) {
        throw new Error('useLearningPlans must be used within a LearningPlansProvider');
    }
    return context;
} 