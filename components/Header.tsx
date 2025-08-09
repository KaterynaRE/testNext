"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header(){
   const pathname = usePathname();
   const isLoggedIn = false;

    return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700">My Test Auth App</h1>
      <nav className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </>
        ) : (
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        )}
      </nav>
    </header>
  );
}