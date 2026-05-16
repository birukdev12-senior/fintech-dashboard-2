'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DynamicChartsProps {
  revenueData: ChartData<'line'>;
  signupData: ChartData<'bar'>;
  expenseData: ChartData<'doughnut'>;
  chartOptions: any;
}

export default function DynamicCharts({ revenueData, signupData, expenseData, chartOptions }: DynamicChartsProps) {
  return (
    <>
      <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-400/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Revenue Trend</h2>
            <p className="mt-1 text-sm text-slate-500">Monthly revenue performance over the last six months.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
            6 month view
          </span>
        </div>
        <div className="mt-6 h-[260px]">
          <Line data={revenueData} options={chartOptions} />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-400/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">Expense Breakdown</h2>
            <p className="mt-1 text-sm text-slate-500">Distribution of operating expenses.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
            2026 Q2
          </span>
        </div>
        <div className="mt-6 h-[260px]">
          <Doughnut data={expenseData} options={chartOptions} />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-400/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">User Signups</h2>
            <p className="mt-1 text-sm text-slate-500">New account signups each month.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600">
            Active growth
          </span>
        </div>
        <div className="mt-6 h-[320px]">
          <Bar data={signupData} options={chartOptions} />
        </div>
      </div>
    </>
  );
}
