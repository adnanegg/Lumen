export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-heading text-5xl font-bold text-primary-700">Lumen</h1>
        <p className="mt-4 font-body text-lg text-neutral-600">
          Scheduling & Operations Platform
        </p>
        <div className="mt-8 flex gap-4">
          <span className="rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white">
            Marketing Site
          </span>
        </div>
      </div>
    </main>
  );
}
