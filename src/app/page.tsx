"use client";

import React, { lazy, Suspense, useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Menu,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

const Line = lazy(() =>
  import("react-chartjs-2").then((m) => ({ default: m.Line })),
);
const Bar = lazy(() =>
  import("react-chartjs-2").then((m) => ({ default: m.Bar })),
);
const Doughnut = lazy(() =>
  import("react-chartjs-2").then((m) => ({ default: m.Doughnut })),
);

const sampleData = {
  monthlyRevenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12000, 19000, 15000, 21000, 24000, 28000],
        borderColor: "rgb(75,192,192)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  userSignups: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [200, 450, 350, 520, 480, 610],
        backgroundColor: "rgba(54,162,235,0.7)",
      },
    ],
  },
  expenseBreakdown: {
    labels: ["Salaries", "Marketing", "Infrastructure", "Others"],
    datasets: [
      {
        data: [45000, 22000, 12000, 8000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  },
  recentTransactions: [
    {
      id: 1,
      customer: "Alice Johnson",
      amount: "$1,200",
      status: "Completed",
      date: "2026-05-10",
    },
    {
      id: 2,
      customer: "Bob Smith",
      amount: "$850",
      status: "Pending",
      date: "2026-05-09",
    },
    {
      id: 3,
      customer: "Carol White",
      amount: "$2,300",
      status: "Completed",
      date: "2026-05-08",
    },
    {
      id: 4,
      customer: "Dave Lee",
      amount: "$430",
      status: "Failed",
      date: "2026-05-07",
    },
    {
      id: 5,
      customer: "Eva Brown",
      amount: "$1,750",
      status: "Completed",
      date: "2026-05-06",
    },
  ],
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

function SidebarItem({
  icon,
  text,
  active,
  sidebarOpen,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  sidebarOpen: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
        active ? "bg-blue-700" : "hover:bg-blue-800"
      }`}
      role="button"
      tabIndex={0}
      aria-label={text}
    >
      {icon}
      {sidebarOpen && <span className="text-sm">{text}</span>}
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
        <div className="text-sm mt-1 flex items-center gap-2">
          <span
            className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? "▲" : "▼"}
          </span>
          <span className="text-gray-500">{change}</span>
        </div>
      </div>
      <div className="text-blue-600">{icon}</div>
    </div>
  );
}

export default function FinTechDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 rounded shadow"
        aria-label="Skip to content"
      >
        Skip to content
      </a>
      <div className="flex">
        <aside
          className={`${sidebarOpen ? "w-64" : "w-20"} bg-blue-900 text-white transition-all duration-300 p-4 flex flex-col`}
          aria-label="Sidebar navigation"
        >
          <div className="flex items-center justify-between mb-6">
            {sidebarOpen && <h1 className="text-xl font-bold">FinDash</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-800 rounded"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2" aria-label="Main">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              text="Dashboard"
              active
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem
              icon={<TrendingUp size={18} />}
              text="Analytics"
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem
              icon={<Users size={18} />}
              text="Customers"
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem
              icon={<DollarSign size={18} />}
              text="Revenue"
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem
              icon={<Activity size={18} />}
              text="Reports"
              sidebarOpen={sidebarOpen}
            />
          </nav>

          <div className="mt-4 text-xs text-blue-200">
            © {new Date().getFullYear()} FinDash
          </div>
        </aside>

        <main
          id="main-content"
          className="flex-1 p-6"
          aria-label="Main content"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Users"
              value="12,480"
              change="+12.5%"
              icon={<Users size={20} />}
            />
            <StatCard
              title="Revenue"
              value="$48,500"
              change="+8.2%"
              icon={<DollarSign size={20} />}
            />
            <StatCard
              title="Transactions"
              value="1,823"
              change="+15.3%"
              icon={<Activity size={20} />}
            />
            <StatCard
              title="Growth"
              value="23.6%"
              change="+5.1%"
              icon={<TrendingUp size={20} />}
            />
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
              <Suspense
                fallback={
                  <div className="h-80 w-full bg-gray-200 animate-pulse rounded-lg" />
                }
              >
                <Line
                  data={sampleData.monthlyRevenue as any}
                  options={{ responsive: true }}
                />
              </Suspense>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
              <Suspense
                fallback={
                  <div className="h-80 w-full bg-gray-200 animate-pulse rounded-lg" />
                }
              >
                <Doughnut
                  data={sampleData.expenseBreakdown as any}
                  options={{ responsive: true }}
                />
              </Suspense>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">User Signups</h2>
              <Suspense
                fallback={
                  <div className="h-80 w-full bg-gray-200 animate-pulse rounded-lg" />
                }
              >
                <Bar
                  data={sampleData.userSignups as any}
                  options={{ responsive: true }}
                />
              </Suspense>
            </div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table
                className="min-w-full text-left"
                role="table"
                aria-label="Recent transactions"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.recentTransactions.map((txn) => (
                    <tr key={txn.id} className="border-t">
                      <td className="p-3">{txn.customer}</td>
                      <td className="p-3">{txn.amount}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusClass(txn.status)}`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className="p-3">{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
