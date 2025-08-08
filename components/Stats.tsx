'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MousePointer, Users, Globe } from "lucide-react";

interface StatItem {
  icon: any;
  label: string;
  value: number;
  suffix: string;
  increment: number;
}

const statsData: StatItem[] = [
  {
    icon: Mail,
    label: "Emails Generated",
    value: 2847392,
    suffix: "",
    increment: 3
  },
  {
    icon: Users,
    label: "Happy Users",
    value: 847293,
    suffix: "",
    increment: 2
  },
  {
    icon: Globe,
    label: "Countries Served",
    value: 152,
    suffix: "",
    increment: 0
  },
  {
    icon: MousePointer,
    label: "Success Rate",
    value: 94,
    suffix: "%",
    increment: 1
  }
];

function formatNumber(num: number, suffix: string = ""): string {
  if (suffix === "K") {
    return `${num}${suffix}`;
  }
  return num.toLocaleString() + suffix;
}

export default function Stats() {
  const [stats, setStats] = useState(statsData);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * stat.increment) + 1
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Real-time Statistics
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            See the impact Letterm8 is making worldwide, updated in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatNumber(stat.value, stat.suffix)}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium">Live updates every few seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}