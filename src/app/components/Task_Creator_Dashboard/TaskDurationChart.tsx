"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface AverageDuration {
  date: string; // Assuming format is YYYY-MM-DD
  averageDuration: string; // Format like "-53d -18h -48m"
}

interface TotalDurationAnalytics {
  workerEngagements: AverageDuration[];
}

const TaskDuration: React.FC<TotalDurationAnalytics> = ({ workerEngagements }) => {
  // Function to convert duration string to hours
  const parseDuration = (durationStr: string): number => {
    // Handle positive or negative durations
    const isNegative = durationStr.startsWith('-');
    const cleanStr = durationStr.replace(/^-/, '');

    let totalHours = 0;
    
    // Extract days
    const daysMatch = cleanStr.match(/(\d+)d/);
    if (daysMatch) totalHours += parseInt(daysMatch[1]) * 24;

    // Extract hours
    const hoursMatch = cleanStr.match(/(\d+)h/);
    if (hoursMatch) totalHours += parseInt(hoursMatch[1]);

    // Extract minutes
    const minutesMatch = cleanStr.match(/(\d+)m/);
    if (minutesMatch) totalHours += parseInt(minutesMatch[1]) / 60;

    return isNegative ? -totalHours : totalHours;
  };

  // Process data to group by month and format for the chart
  const processChartData = (engagements: AverageDuration[]) => {
    const monthMap = new Map<string, { total: number; count: number }>();

    engagements.forEach(({ date, averageDuration }) => {
      const dateObj = new Date(date);
      const monthYear = dateObj.toLocaleString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
      
      const durationHours = parseDuration(averageDuration);
      
      if (!monthMap.has(monthYear)) {
        monthMap.set(monthYear, { total: 0, count: 0 });
      }
      
      const monthData = monthMap.get(monthYear)!;
      monthData.total += durationHours;
      monthData.count += 1;
    });

    // Convert to array and calculate averages
    return Array.from(monthMap.entries())
      .map(([name, { total, count }]) => ({
        name,
        value: total / count, // Average hours
      }))
      .sort((a, b) => {
        // Sort chronologically
        return new Date(a.name).getTime() - new Date(b.name).getTime();
      });
  };

  const chartData = processChartData(workerEngagements);

  return (
    <div className="rounded-lg p-6 flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-8 border border-gray-200 px-8 py-4 rounded-lg">
        <div className="pl-5 mb-1 w-full">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value.toFixed(1)}h`}
                tickMargin={10}
                label={{ 
                  value: 'Hours', 
                  angle: -90, 
                  position: 'insideLeft',
                  fontSize: 12 
                }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value.toFixed(2)} hours`, "Average Duration"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                name="Average Duration"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TaskDuration;