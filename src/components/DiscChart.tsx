
import React from 'react';
import { DiscProfile } from '@/lib/disc-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface DiscChartProps {
  profile: DiscProfile;
  className?: string;
}

const DiscChart: React.FC<DiscChartProps> = ({ profile, className }) => {
  const data = [
    { name: 'D', value: profile.D, color: '#F97316' },  // Orange
    { name: 'I', value: profile.I, color: '#8B5CF6' },  // Purple
    { name: 'S', value: profile.S, color: '#10B981' },  // Green
    { name: 'C', value: profile.C, color: '#0EA5E9' },  // Blue
  ];

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 16, fontWeight: 'bold' }}
          />
          <YAxis 
            domain={[0, 12]} 
            ticks={[0, 3, 6, 9, 12]} 
          />
          <Tooltip 
            formatter={(value) => [`Score: ${value}`, '']}
            labelStyle={{ fontWeight: 'bold', color: '#333' }}
            contentStyle={{ 
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiscChart;
