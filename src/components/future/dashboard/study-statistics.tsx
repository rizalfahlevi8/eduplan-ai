"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, BookOpen, Target, Calendar } from "lucide-react";
import { LearningPlan } from "@/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";

interface StudyStatisticsProps {
  learningPlans: LearningPlan[];
  loading: boolean;
}

export function StudyStatistics({ learningPlans, loading }: StudyStatisticsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Calculate statistics (mock data for demonstration)
  const totalDays = learningPlans.reduce((sum, plan) => sum + plan.numberOfDays, 0);
  const completedDays = Math.floor(Math.random() * totalDays * 0.7); // Mock 0-70% completion
  const averageTimePerDay = 45; // Mock: 45 minutes average
  const totalStudyTime = completedDays * averageTimePerDay;
  const currentStreak = Math.floor(Math.random() * 21) + 1; // 1-21 days

  const stats = [
    {
      icon: BookOpen,
      label: "Total Study Days",
      value: completedDays,
      subtitle: `of ${totalDays} planned`,
      color: "text-blue-600",
    },
    {
      icon: Clock,
      label: "Total Study Time",
      value: `${Math.floor(totalStudyTime / 60)}h ${totalStudyTime % 60}m`,
      subtitle: `~${averageTimePerDay}min/day avg`,
      color: "text-green-600",
    },
    {
      icon: Target,
      label: "Study Streak",
      value: `${currentStreak} days`,
      subtitle: "Keep it up!",
      color: "text-orange-600",
    },
    {
      icon: Calendar,
      label: "This Week",
      value: Math.floor(Math.random() * 7) + 1,
      subtitle: "study sessions",
      color: "text-purple-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="size-5" />
          Study Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
              <stat.icon className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
          </div>
        ))}

        {learningPlans.length === 0 && (
          <div className="text-center py-8">
            <BarChart3 className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Statistics Yet</h3>
            <p className="text-muted-foreground text-sm">
              Start studying to see your progress statistics here.
            </p>
          </div>
        )}

        {/* Achievement Badges */}
        {learningPlans.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">Recent Achievements</p>
            <div className="flex flex-wrap gap-2">
              {currentStreak >= 7 && (
                <Badge variant="default" className="text-xs">
                  🔥 Week Streak
                </Badge>
              )}
              {completedDays >= 10 && (
                <Badge variant="secondary" className="text-xs">
                  📚 Study Champion
                </Badge>
              )}
              {totalStudyTime >= 300 && (
                <Badge variant="outline" className="text-xs">
                  ⏰ 5+ Hours
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}