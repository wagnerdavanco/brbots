"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-3xl font-bold brand-text">Algo deu errado</h2>
        <p className="text-gray-400">
          Ocorreu um erro inesperado. Tente novamente.
        </p>
        <button
          onClick={reset}
          className="inline-block rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
