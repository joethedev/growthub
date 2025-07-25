'use client';

import { addPeriod } from '@/app/actions/period/add';
import { useState, useTransition } from 'react';

export default function AddPeriod() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await addPeriod({ startDate, endDate });
        setSuccess(true);
        setStartDate('');
        setEndDate('');
      } catch (err: any) {
        setError(err.message || 'Failed to add period');
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded-xl border max-w-md"
    >
      <h2 className="text-xl font-semibold">Add New Period</h2>

      <div className="flex flex-col gap-2">
        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-4 py-2 rounded hover:bg-opacity-80 transition"
      >
        {isPending ? 'Adding...' : 'Add Period'}
      </button>

      {success && <p className="text-green-600">Period added successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
