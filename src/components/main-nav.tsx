"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type MainNavProps = React.HTMLAttributes<HTMLElement>;

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
      position: "left",
    },
    {
      href: "/settings",
      label: "Settings",
      active: pathname === "/settings",
      position: "right",
    },
    {
      href: "/generate-plans",
      label: "Generate Plans",
      active: pathname === "/generate-plans",
      position: "left",
    },
  ];

  return (
    <nav className={cn("flex items-center justify-between w-full", className)}>
      {/* KIRI */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        {routes
          .filter((route) => route.position === "left")
          .map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
      </div>

      {/* KANAN */}
      <div className="flex items-center space-x-4">
        {routes
          .filter((route) => route.position === "right")
          .map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
      </div>
    </nav>
  );
}
