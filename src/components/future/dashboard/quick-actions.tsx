"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Play, BookOpen, Calendar } from "lucide-react";
import { DayPlanModel, LearningPlanModel } from "@/domain/learningPlan-model";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface TodayRecommendation {
  plan: LearningPlanModel;
  currentDay: DayPlanModel;
  dayNumber: number;
  isCompleted: boolean;
}

interface QuickActionsProps {
  todayRecommendation: TodayRecommendation | null;
  loading: boolean;
}

export function QuickActions({ todayRecommendation, loading }: QuickActionsProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4">
          {todayRecommendation && !todayRecommendation.isCompleted ? (
            <Button size="lg" className="flex-1 sm:flex-none">
              <Play className="size-4 mr-2" />
              Start Today&apos;s Study
            </Button>
          ) : (
            <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
              <Calendar className="size-4 mr-2" />
              View Today&apos;s Plan
            </Button>
          )}
          
          <Button size="lg" variant="outline" className="flex-1 sm:flex-none" asChild>
            <Link href="/generate-plans">
              <Plus className="size-4 mr-2" />
              New Learning Plan
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
            <BookOpen className="size-4 mr-2" />
            View All Plans
          </Button>
          
          <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
            <Calendar className="size-4 mr-2" />
            Study Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}