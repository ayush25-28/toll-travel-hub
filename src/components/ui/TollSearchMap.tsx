
import React from 'react';
import { TollGate } from '@/data/mockData';

interface TollSearchMapProps {
  tollGates: TollGate[];
  selectedTollId?: string;
  onSelectToll: (tollId: string) => void;
}

// This is a mock map component - in a real application, you would integrate with a maps API
const TollSearchMap: React.FC<TollSearchMapProps> = ({ 
  tollGates, 
  selectedTollId,
  onSelectToll 
}) => {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-300" style={{ height: '400px' }}>
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="text-gray-500 mb-4">Interactive Map Placeholder</div>
        
        <div className="bg-white rounded-lg shadow-lg p-4 w-80">
          <h3 className="font-medium text-gray-700 mb-2">Available Toll Gates</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {tollGates.map(toll => (
              <div 
                key={toll.id}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  selectedTollId === toll.id ? 'bg-tollBlue-100 border border-tollBlue-300' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => onSelectToll(toll.id)}
              >
                <div className="font-medium text-gray-800">{toll.name}</div>
                <div className="text-sm text-gray-500">{toll.location.address}, {toll.location.city}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {toll.isActive ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                      Open
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                      Closed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TollSearchMap;
