"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { Mood } from '@/interfaces/Mood';

type Reaction = 1 | 2 | 3 | 4 | 5;

interface MoodChartProps {
  data: Mood[]; 
}

const reactions: Record<Reaction, string> = {
  1: '/bravo.svg',
  2: '/triste.svg',
  3: '/indiferente.svg',
  4: '/maisoumenos.svg',
  5: '/feliz.svg',
};

const reactionDescriptions: Record<Reaction, string> = {
  1: 'Frustrante',
  2: 'Triste',
  3: 'Indiferente',
  4: 'Mais ou menos',
  5: 'Feliz',
};

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
          margin={{ top: 10, right: 20, left: 20, bottom: 60 }}
        >
          <CartesianGrid stroke="#e0e0e0" vertical={false} />

          <XAxis
            dataKey="date"
            angle={-45}
            tick={{ fontSize: 12, textAnchor: 'end' }}
            interval={0}
            tickMargin={10}
          />
          <YAxis 
            domain={[1, 5]} 
            ticks={[1, 2, 3, 4, 5]} 
            tick={{ fontSize: 12, textAnchor: 'end' }}
            tickFormatter={(value) => reactionDescriptions[value as Reaction]} 
            tickMargin={10} 
          />

          <Tooltip content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const item = payload[0].payload;
              return (
                <div className="p-2 bg-white rounded shadow">
                  <p> {reactionDescriptions[item.reaction as Reaction]}</p>
                  <p><strong>Motivo:</strong> {item.reason}</p>
                </div>
              );
            }
            return null;
          }} />

          <Line
            type="monotone"
            dataKey="reaction"
            stroke="#548C76"
            strokeWidth={2}
            dot={({ cx, cy, payload }) => {
              const item = payload as Mood; 
              const imgSrc = reactions[item.mood as Reaction];

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
