import React, { useEffect, useState } from 'react';
import {
  currentMonth,
  downloadDailyCsv,
  downloadMonthlyCsv,
  getDailyReport,
  getMonthlyReport,
  money,
  today,
} from '../services/salesApi';

const ReportsPage = () => {
  const [date, setDate] = useState(today);
  const [month, setMonth] = useState(currentMonth);
  const [dailyReport, setDailyReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      setError('');

      try {
        const [daily, monthly] = await Promise.all([
          getDailyReport(date),
          getMonthlyReport(month),
        ]);

        setDailyReport(daily);
        setMonthlyReport(monthly);
      } catch (reportError) {
        setError(reportError.message);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [date, month]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Sales Reports</h1>
        <p className="mt-2 text-gray-600">Track daily and monthly sales from Supabase.</p>
      </div>

      {error && (
        <p className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Daily Sales</h2>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="rounded border px-3 py-2"
            />
          </div>

          <p className="text-3xl font-bold text-teal-600">
            {money.format(dailyReport?.totalSales || 0)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {dailyReport?.salesCount || 0} sale{dailyReport?.salesCount === 1 ? '' : 's'} recorded
          </p>
          <button
            type="button"
            onClick={() => dailyReport && downloadDailyCsv(dailyReport)}
            className="mt-4 rounded bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700"
          >
            Download Daily CSV
          </button>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Monthly Sales</h2>
            <input
              type="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              className="rounded border px-3 py-2"
            />
          </div>

          <p className="text-3xl font-bold text-teal-600">
            {money.format(monthlyReport?.totalSales || 0)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {monthlyReport?.salesCount || 0} sale{monthlyReport?.salesCount === 1 ? '' : 's'} recorded
          </p>
          <button
            type="button"
            onClick={() => monthlyReport && downloadMonthlyCsv(monthlyReport)}
            className="mt-4 rounded bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700"
          >
            Download Monthly CSV
          </button>
        </section>
      </div>

      <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Monthly Daily Breakdown</h2>
          {loading && <span className="text-sm text-gray-500">Loading...</span>}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Sales Count</th>
                <th className="py-3 font-medium">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {(monthlyReport?.dailyTotals || []).map((row) => (
                <tr key={row.date} className="border-b last:border-0">
                  <td className="py-3">{row.date}</td>
                  <td className="py-3">{row.salesCount}</td>
                  <td className="py-3 font-semibold text-gray-900">{money.format(row.totalSales)}</td>
                </tr>
              ))}
              {monthlyReport?.dailyTotals?.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-gray-500">
                    No sales recorded for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;
