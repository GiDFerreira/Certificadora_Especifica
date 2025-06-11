"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { Mood } from '@/interfaces/Mood';
import { formatBrazilianDate } from '@/utils/dateUtils';
import { Reaction } from '@/utils/enums/Reaction';
import { reactionImages, reactionDescriptions } from '@/utils/constants/reactionsMapping';

interface MoodChartProps {
  data: Mood[]; 
}

export default function MoodChart({ data }: MoodChartProps) {
  const [period, setPeriod] = useState('15');
  
  const filteredData = data.slice(-Number(period));

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="15">Últimos 15 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <LineChart 
          data={filteredData}
          margin={{ top: 10, right: 10, left: 50, bottom: 60 }}
        >
          <CartesianGrid stroke="#e0e0e0" vertical={false} />

          <XAxis
            dataKey="createdAt"
            angle={-45}
            tick={{ fontSize: 12, textAnchor: 'end' }}
            interval={0}
            tickMargin={10}
            tickFormatter={(value) => formatBrazilianDate(value)}
          />
          <YAxis 
            domain={[1, 5]} 
            ticks={[1, 2, 3, 4, 5]} 
            hide
          />

          <Tooltip content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const item = payload[0].payload;
              return (
                <div className="p-2 bg-white rounded shadow">
                  <p> {reactionDescriptions[item.mood as Reaction]}</p>
                  <p><strong>Motivo:</strong> {item.note}</p>
                </div>
              );
            }
            return null;
          }} />

          <Line
            type="monotone"
            dataKey="mood"
            stroke="#548C76"
            strokeWidth={2}
            dot={({ cx, cy, payload }) => {
              console.log(payload);
              const item = payload as Mood; 
              const imgSrc = reactionImages[item.mood as Reaction];

              return (
                <svg x={cx - 12} y={cy - 12} width={24} height={24}>
                  <image
                    href={imgSrc}
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  />
                </svg>
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
