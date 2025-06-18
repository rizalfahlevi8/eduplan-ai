"use client"

import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { LearningPlanPdf } from "../learningPlanPDF";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DownloadPdfButton = ({ learningPlan }: { learningPlan: any }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <PDFDownloadLink
      document={<LearningPlanPdf learningPlan={learningPlan} />}
      fileName={`rencana-pembelajaran-${new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .slice(0, 16)}.pdf`}
    >
      {({ loading }) =>
        <Button>{loading ? 'Menyiapkan...' : 'Download PDF'}</Button>
      }
    </PDFDownloadLink>
  );
};
