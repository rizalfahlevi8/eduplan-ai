export default function GeneratePlansLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="h-[calc(100vh-4.1rem)] overflow-hidden"> {/* 4rem = 64px */}
        {children}
      </div>
    );
  }
  