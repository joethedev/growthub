'use client';
import AddPeriodModalButton from '@/components/AddPeriodModalButton';
import AudioRecorder from '@/components/AudioRecorder';
import { Dashboard } from '@/components/dashboard/Dashboard';
import Link from 'next/link';

export default function DashPage() {
  const buttons = [
    {
      label: 'Spendings',
      link: '/dashboard/spendings',
    },
    {
      label: 'Habits',
      link: '/dashboard/spendings',
    },
    {
      label: 'Journaling',
      link: '/dashboard/spendings',
    },
    {
      label: 'Workouts',
      link: '/dashboard/spendings',
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
      <Dashboard />
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <AudioRecorder />
      <AddPeriodModalButton />
      <div className="grid grid-cols-2 gap-4">
        {buttons.map((btn) => (
          <Link
            href={btn.link}
            key={btn.label}
            className="px-6 py-3 rounded-2xl shadow-md bg-gray-100 hover:bg-gray-200 transition-colors text-lg"
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
