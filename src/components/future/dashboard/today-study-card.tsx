"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, BookOpen, Play, CheckCircle } from "lucide-react";
import { DayPlanModel, LearningPlanModel } from "@/domain/learningPlan-model";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

interface TodayRecommendation {
  plan: LearningPlanModel;
  currentDay: DayPlanModel;
  dayNumber: number;
  isCompleted: boolean;
}

interface TodayStudyCardProps {
  recommendation: TodayRecommendation | null;
  loading: boolean;
  onProgressUpdate?: () => void;
}

export function TodayStudyCard({ recommendation, loading, onProgressUpdate }: TodayStudyCardProps) {
  const { getToken } = useAuth();
  const [updating, setUpdating] = useState(false);

  const handleMarkComplete = async () => {
    if (!recommendation) return;
    
    setUpdating(true);
    try {
      const token = await getToken();
      if (!token) return;

      await axios.post('/api/dashboard/progress', {
        learningPlanId: 'mock-plan-id', // In real app, this would come from the recommendation
        dayNumber: recommendation.dayNumber,
        completed: !recommendation.isCompleted
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(recommendation.isCompleted ? "Marked as incomplete" : "Study session completed! 🎉");
      onProgressUpdate?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update progress");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Today&apos;s Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <BookOpen className="size-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Study Plan Available</h3>
          <p className="text-muted-foreground mb-4">
            Create your first learning plan to get started with daily recommendations.
          </p>
          <Button asChild>
            <Link href="/generate-plans">Create Learning Plan</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { currentDay, dayNumber, isCompleted, plan } = recommendation;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5" />
            Today&apos;s Study Plan
          </CardTitle>
          <Badge variant={isCompleted ? "default" : "secondary"}>
            Day {dayNumber}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="size-4" />
            {plan.goal}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            {currentDay.materials.length} materials
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme and Activity */}
        <div>
          <h3 className="font-semibold text-lg mb-2">{currentDay.theme}</h3>
          <p className="text-muted-foreground">{currentDay.activityTitle}</p>
        </div>

        {/* Materials */}
        <div>
          <h4 className="font-medium mb-2">Materials Needed:</h4>
          <div className="flex flex-wrap gap-2">
            {currentDay.materials.map((material, index) => (
              <Badge key={index} variant="outline">
                {material}
              </Badge>
            ))}
          </div>
        </div>

        {/* Learning Steps Preview */}
        <div>
          <h4 className="font-medium mb-2">Today&apos;s Activities:</h4>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Opening:</span>{" "}
              {currentDay.steps.pembukaan[0] || "Begin with prayer"}
            </div>
            <div className="text-sm">
              <span className="font-medium">Main Activity:</span>{" "}
              {currentDay.steps.kegiatan[0] || "Interactive learning"}
            </div>
            <div className="text-sm">
              <span className="font-medium">Discussion:</span>{" "}
              {currentDay.steps.diskusi[0] || "Reflection time"}
            </div>
          </div>
        </div>

        {/* Benefits Preview */}
        <div>
          <h4 className="font-medium mb-2">Learning Benefits:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Faith:</span> {currentDay.benefits.iman}
            </div>
            <div>
              <span className="font-medium">Cognitive:</span> {currentDay.benefits.cognitive}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          {!isCompleted ? (
            <>
              <Button className="flex-1">
                <Play className="size-4 mr-2" />
                Start Today&apos;s Study
              </Button>
              <Button 
                variant="outline" 
                onClick={handleMarkComplete}
                disabled={updating}
              >
                <CheckCircle className="size-4 mr-2" />
                {updating ? "Updating..." : "Mark Complete"}
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleMarkComplete}
              disabled={updating}
            >
              <CheckCircle className="size-4 mr-2" />
              {updating ? "Updating..." : "Completed Today"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}