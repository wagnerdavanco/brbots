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
    <div className="grid min-h-screen place-items-center bg-[var(--bg-primary)] p-8 text-[var(--text-primary)]">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-3xl font-bold brand-text">Algo deu errado</h2>
        <p className="text-[var(--text-muted)]">
          Ocorreu um erro inesperado. Tente novamente.
        </p>
        <button
          onClick={reset}
          className="inline-block rounded-full brand-gradient px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
