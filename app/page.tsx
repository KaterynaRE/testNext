import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Головна сторінка",
};

export default function Home() {
    return (
    <main className="min-h-screen bg-gray-100 text-center">
      <Header />
      <section className="mt-20">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Ласкаво просимо до нашого сайту!
        </h1>
        <p className="text-lg text-gray-600">
          Це головна сторінка. Увійдіть або зареєструйтесь, щоб продовжити.
        </p>
      </section>
    </main>
  );
}
