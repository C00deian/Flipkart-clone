export default function ForbiddenPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="mt-2 text-slate-600">
        You are signed in, but you do not have permission to access this page.
      </p>
    </div>
  );
}

