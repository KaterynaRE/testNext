"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.password || !formData.email) {
      setError("Пароль або email не вірний");
      return;
    }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
         credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Помилка входу");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Невідома помилка");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Вхід
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full mt-1 p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Пароль</label>
              <input
                type="password"
                name="password"
                className="w-full mt-1 p-2 border rounded"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Увійти
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
