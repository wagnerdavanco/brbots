import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="text-center space-y-6">
        <h1 className="text-8xl font-extrabold brand-text">404</h1>
        <p className="text-xl text-gray-400">
          A pagina que voce procura nao foi encontrada.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] px-8 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Voltar ao inicio
        </Link>
      </div>
    </div>
  );
}
