import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--bg-primary)] p-8 text-[var(--text-primary)]">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-extrabold brand-text">404</h1>
        <p className="text-xl text-[var(--text-muted)]">
          A pagina que voce procura nao foi encontrada.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full brand-gradient px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Voltar ao inicio
        </Link>
      </div>
    </div>
  );
}
