import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-lg border bg-white p-10 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-slate-600">The requested poll or page does not exist.</p>
      <Link
        to="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-sky-700 px-4 text-sm font-medium text-white hover:bg-sky-800"
      >
        Back Home
      </Link>
    </div>
  );
}
