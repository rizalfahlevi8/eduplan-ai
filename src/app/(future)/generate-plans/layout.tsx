import { getVerify } from "@/lib/auth";

export default async function GeneratePlansLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    await getVerify(); 
    return (
      <div className="h-[calc(100vh-4.1rem)] overflow-hidden"> 
        {children}
      </div>
    );
  }
  