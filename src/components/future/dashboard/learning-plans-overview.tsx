"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Calendar, Target } from "lucide-react";
import { LearningPlan } from "@/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface LearningPlansOverviewProps {
  learningPlans: LearningPlan[];
  loading: boolean;
}

export function LearningPlansOverview({ learningPlans, loading }: LearningPlansOverviewProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="size-5" />
            Learning Plans
          </CardTitle>
          <Button size="sm" variant="outline" asChild>
            <Link href="/generate-plans">
              <Plus className="size-4 mr-1" />
              Add
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {learningPlans.length > 0 ? (
          <>
            {learningPlans.slice(0, 3).map((plan) => (
              <div key={plan.id} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{plan.goal}</h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {plan.interests}
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {plan.numberOfDays} days
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    Created {formatDate(plan.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="size-3" />
                    {Math.floor(Math.random() * plan.numberOfDays) + 1} / {plan.numberOfDays}
                  </div>
                </div>
              </div>
            ))}
            
            {learningPlans.length > 3 && (
              <Button variant="outline" size="sm" className="w-full">
                View All {learningPlans.length} Plans
              </Button>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Learning Plans</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Create your first learning plan to get started with personalized daily study recommendations.
            </p>
            <Button asChild>
              <Link href="/generate-plans">
                <Plus className="size-4 mr-2" />
                Create First Plan
              </Link>
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        {learningPlans.length > 0 && (
          <div className="pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold">{learningPlans.length}</p>
                <p className="text-xs text-muted-foreground">Total Plans</p>
              </div>
              <div>
                <p className="text-lg font-bold">
                  {learningPlans.reduce((sum, plan) => sum + plan.numberOfDays, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Days</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}