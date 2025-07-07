"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";
import { LearningPlan } from "@/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgressOverviewProps {
  learningPlans: LearningPlan[];
  loading: boolean;
}

export function ProgressOverview({ learningPlans, loading }: ProgressOverviewProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Calculate overall progress (mock data for now)
  const totalPlans = learningPlans.length;
  const completedDays = Math.floor(Math.random() * 50); // Mock data
  const totalDays = learningPlans.reduce((sum, plan) => sum + plan.numberOfDays, 0);
  const overallProgress = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
  
  // Study streak (mock data)
  const studyStreak = Math.floor(Math.random() * 14) + 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="size-5" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {completedDays} of {totalDays} study days completed
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-primary" />
              <span className="text-sm font-medium">Active Plans</span>
            </div>
            <p className="text-2xl font-bold">{totalPlans}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-primary" />
              <span className="text-sm font-medium">Study Streak</span>
            </div>
            <p className="text-2xl font-bold">{studyStreak} days</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="font-medium mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {learningPlans.slice(0, 3).map((plan) => {
              const daysCompleted = Math.floor(Math.random() * plan.numberOfDays);
              const progress = (daysCompleted / plan.numberOfDays) * 100;
              
              return (
                <div key={plan.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{plan.goal}</p>
                      <p className="text-xs text-muted-foreground">
                        {daysCompleted}/{plan.numberOfDays} days
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {Math.round(progress)}%
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-1" />
                </div>
              );
            })}
            
            {learningPlans.length === 0 && (
              <div className="text-center py-4">
                <Calendar className="size-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No learning plans yet. Create one to start tracking progress!
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}