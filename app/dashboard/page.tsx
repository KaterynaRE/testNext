"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"products" | "profile">("products");
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  activeTab === "products"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("products")}
              >
                Товари
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  activeTab === "profile"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Профіль
              </button>
            </li>
            <li>
               <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.push("/")}
        >
          На головну
        </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-grow p-6">
        {activeTab === "products" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Товари</h2>
            <p>Список товарів з бази буде тут...</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Профіль користувача</h2>
            <p>Інформація про користувача з бекенду...</p>
          </div>
        )}
      </main>
    </div>
  );
}
