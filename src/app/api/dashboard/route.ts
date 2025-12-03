import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        // Get user's learning plans
        const learningPlans = await db.learningPlan.findMany({
            where: { userId },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Calculate dashboard statistics
        const totalPlans = learningPlans.length;
        const totalDays = learningPlans.reduce((sum, plan) => sum + plan.numberOfDays, 0);
        
        // Mock progress data (in real app, this would come from a progress tracking table)
        const completedDays = Math.floor(Math.random() * totalDays * 0.7); // 0-70% completion
        const studyStreak = Math.floor(Math.random() * 21) + 1; // 1-21 days
        const totalStudyTime = completedDays * 45; // 45 minutes average per day

        // Get today's recommendation
        let todayRecommendation = null;
        if (learningPlans.length > 0) {
            const latestPlan = learningPlans[0];
            
            if (latestPlan.planJson && typeof latestPlan.planJson === 'object') {
                const planData = latestPlan.planJson as { days: unknown[] };
                
                if (planData.days && planData.days.length > 0) {
                    // For demo purposes, rotate through days based on current date
                    const today = new Date();
                    const dayIndex = (today.getDate() - 1) % planData.days.length;
                    const currentDay = planData.days[dayIndex];

                    if (currentDay) {
                        todayRecommendation = {
                            plan: {
                                numberOfDay: latestPlan.numberOfDays,
                                goal: latestPlan.goal,
                                interest: latestPlan.interests,
                                plan: planData
                            },
                            currentDay,
                            dayNumber: dayIndex + 1,
                            isCompleted: Math.random() < 0.3 // 30% chance of being completed
                        };
                    }
                }
            }
        }

        const dashboardData = {
            // Today's recommendation
            todayRecommendation,
            
            // Statistics
            statistics: {
                totalPlans,
                totalDays,
                completedDays,
                studyStreak,
                totalStudyTime,
                averageTimePerDay: totalDays > 0 ? Math.round(totalStudyTime / totalDays) : 0,
                weeklyProgress: Math.floor(Math.random() * 7) + 1, // 1-7 sessions this week
            },

            // Learning plans summary
            learningPlans: learningPlans.map(plan => ({
                id: plan.id,
                goal: plan.goal,
                interests: plan.interests,
                numberOfDays: plan.numberOfDays,
                createdAt: plan.createdAt,
                // Mock progress for each plan
                progress: {
                    completed: Math.floor(Math.random() * plan.numberOfDays),
                    total: plan.numberOfDays,
                }
            })),

            // Recent achievements (mock data)
            achievements: [
                ...(studyStreak >= 7 ? [{ type: "streak", name: "Week Streak", icon: "🔥" }] : []),
                ...(completedDays >= 10 ? [{ type: "champion", name: "Study Champion", icon: "📚" }] : []),
                ...(totalStudyTime >= 300 ? [{ type: "time", name: "5+ Hours", icon: "⏰" }] : []),
            ]
        };

        return NextResponse.json(dashboardData);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return new Response("Internal Error", { status: 500 });
    }
}