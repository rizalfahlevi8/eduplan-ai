import { getVerify } from "@/lib/auth";
import { LearningPlanProvider } from "@/providers/learningPlan-provider";

export default async function GeneratePlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getVerify();
  return (
    <LearningPlanProvider>
      <div className="h-[calc(100vh-4.1rem)] overflow-hidden">
        {children}
      </div>
    </LearningPlanProvider>
  );
}
