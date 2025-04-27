// src/components/dashboard/DashboardHeader.tsx
export default function DashboardHeader({ title }: { title: string }) {
    return (
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    );
  }
  