'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ChartData, ChartOptions } from "chart.js";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), { ssr: false });
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });
const Doughnut = dynamic(() => import("react-chartjs-2").then((mod) => mod.Doughnut), { ssr: false });

const chartComponents = {
  line: Line,
  bar: Bar,
  doughnut: Doughnut,
} as const;

interface ChartClientProps {
  type: "line" | "bar" | "doughnut";
  data: ChartData<'line' | 'bar' | 'doughnut'>;
  options?: ChartOptions<'line' | 'bar' | 'doughnut'>;
}

let chartJsRegistered = false;

async function registerChartJs() {
  if (chartJsRegistered) {
    return;
  }

  const ChartJS = await import("chart.js");

  ChartJS.Chart.register(
    ChartJS.CategoryScale,
    ChartJS.LinearScale,
    ChartJS.PointElement,
    ChartJS.LineElement,
    ChartJS.BarElement,
    ChartJS.ArcElement,
    ChartJS.Title,
    ChartJS.Tooltip,
    ChartJS.Legend,
    ChartJS.Filler,
  );

  chartJsRegistered = true;
}

export default function ChartClient({ type, data, options }: ChartClientProps) {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    let active = true;

    const register = () => {
      if (chartJsRegistered) {
        if (active) {
          setRegistered(true);
        }
        return;
      }

      registerChartJs().then(() => {
        if (active) {
          setRegistered(true);
        }
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const callbackId = (window as any).requestIdleCallback(register);
      return () => {
        active = false;
        (window as any).cancelIdleCallback(callbackId);
      };
    }

    const timeoutId = globalThis.setTimeout(register, 250);
    return () => {
      active = false;
      globalThis.clearTimeout(timeoutId);
    };
  }, []);

  if (!registered) {
    return <div className="h-80 w-full rounded-lg bg-gray-200 animate-pulse" />;
  }

  const Component = chartComponents[type] as any;
  return <Component data={data} options={options} />;
}
