
import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend = 'neutral',
  className 
}) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-lg shadow-sm border border-gray-100",
      className
    )}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              {trend === 'up' && (
                <span className="text-green-500 text-xs font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                    <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
                  </svg>
                  {change}
                </span>
              )}
              {trend === 'down' && (
                <span className="text-red-500 text-xs font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                  </svg>
                  {change}
                </span>
              )}
              {trend === 'neutral' && (
                <span className="text-gray-500 text-xs font-medium">
                  {change}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-1 flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-full bg-tollBlue-50 text-tollBlue-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
