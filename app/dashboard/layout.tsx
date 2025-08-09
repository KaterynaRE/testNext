import { ReactNode } from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Мій Дашборд</h1>
      </header>

      <main className="flex-grow p-6 bg-gray-50">{children}</main>
    </div>
  );
}
