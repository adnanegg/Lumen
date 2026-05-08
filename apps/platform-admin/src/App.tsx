import './index.css';

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-heading text-5xl font-bold text-primary-700">Lumen</h1>
        <p className="mt-4 font-body text-lg text-neutral-600">
          Platform Administration
        </p>
        <div className="mt-8 flex gap-4">
          <span className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white">
            Platform Admin
          </span>
        </div>
      </div>
    </main>
  );
}
