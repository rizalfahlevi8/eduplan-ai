"use client";

import { useState, useEffect, useCallback } from "react";
import { useLearningPlans } from "@/providers/learningPlan-provider";
import { TodayStudyCard } from "./today-study-card";
import { ProgressOverview } from "./progress-overview";
import { LearningPlansOverview } from "./learning-plans-overview";
import { StudyStatistics } from "./study-statistics";
import { QuickActions } from "./quick-actions";
import { LearningPlanModel, DayPlanModel } from "@/domain/learningPlan-model";

interface TodayRecommendation {
  plan: LearningPlanModel;
  currentDay: DayPlanModel;
  dayNumber: number;
  isCompleted: boolean;
}

export function DashboardContent() {
  const { learningPlans } = useLearningPlans();
  const [todayRecommendation, setTodayRecommendation] = useState<TodayRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  const getTodayRecommendation = useCallback(() => {
    if (!learningPlans || learningPlans.length === 0) {
      setTodayRecommendation(null);
      setLoading(false);
      return;
    }

    // For now, use the most recent learning plan
    // In the future, this could be enhanced to handle multiple active plans
    const latestPlan = learningPlans[0];
    
    if (!latestPlan.planJson || typeof latestPlan.planJson !== 'object') {
      setTodayRecommendation(null);
      setLoading(false);
      return;
    }

    const planData = latestPlan.planJson as { days: DayPlanModel[] };
    
    if (!planData.days || planData.days.length === 0) {
      setTodayRecommendation(null);
      setLoading(false);
      return;
    }

    // For demo purposes, we'll rotate through days
    // In a real implementation, this would track actual progress
    const today = new Date();
    const dayIndex = (today.getDate() - 1) % planData.days.length;
    const currentDay = planData.days[dayIndex];

    if (currentDay) {
      const recommendation: TodayRecommendation = {
        plan: {
          numberOfDay: latestPlan.numberOfDays,
          goal: latestPlan.goal,
          interest: latestPlan.interests,
          plan: planData
        },
        currentDay,
        dayNumber: dayIndex + 1,
        isCompleted: false // TODO: Get from progress tracking
      };

      setTodayRecommendation(recommendation);
    } else {
      setTodayRecommendation(null);
    }
    
    setLoading(false);
  }, [learningPlans]);

  useEffect(() => {
    getTodayRecommendation();
  }, [getTodayRecommendation]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your daily learning overview.
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions 
        todayRecommendation={todayRecommendation}
        loading={loading}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Today's Study */}
        <div className="lg:col-span-2 space-y-6">
          <TodayStudyCard 
            recommendation={todayRecommendation}
            loading={loading}
          />
          
          <ProgressOverview 
            learningPlans={learningPlans}
            loading={loading}
          />
        </div>

        {/* Right Column - Overview & Statistics */}
        <div className="space-y-6">
          <StudyStatistics 
            learningPlans={learningPlans}
            loading={loading}
          />
          
          <LearningPlansOverview 
            learningPlans={learningPlans}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}