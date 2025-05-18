
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TollGate, mockTollGates } from '@/data/mockData';
import TollSearchMap from '@/components/ui/TollSearchMap';
import { MapPin, Search, AlertTriangle } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTollGates, setActiveTollGates] = useState<TollGate[]>(mockTollGates.filter(gate => gate.isActive));
  const [selectedTollId, setSelectedTollId] = useState<string | undefined>();
  const [selectedToll, setSelectedToll] = useState<TollGate | undefined>();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setActiveTollGates(mockTollGates.filter(gate => gate.isActive));
    } else {
      const filteredGates = mockTollGates.filter(gate => 
        gate.isActive && (
          gate.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          gate.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          gate.location.address.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setActiveTollGates(filteredGates);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedTollId) {
      const toll = mockTollGates.find(gate => gate.id === selectedTollId);
      setSelectedToll(toll);
    } else {
      setSelectedToll(undefined);
    }
  }, [selectedTollId]);

  const handleSelectToll = (tollId: string) => {
    setSelectedTollId(tollId);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Toll Gates</h1>
          <p className="text-lg text-gray-600 mt-2">
            Locate toll gates near you or search by name, city, or address
          </p>
        </div>

        <div className="relative mb-8 max-w-lg mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search toll gates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>

        {mockTollGates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <AlertTriangle className="h-16 w-16 text-yellow-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Toll Gates Available</h3>
              <p className="text-gray-500 max-w-md">
                There are currently no toll gates in the system. Once the database is connected, 
                you will be able to search and view toll gates on the map.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <Card className="overflow-hidden">
                <CardHeader className="bg-tollBlue-50">
                  <CardTitle className="text-tollBlue-800">Interactive Map</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <TollSearchMap 
                    tollGates={activeTollGates} 
                    selectedTollId={selectedTollId}
                    onSelectToll={handleSelectToll}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:w-1/3">
              {selectedToll ? (
                <Card className="h-full">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <MapPin size={20} />
                      {selectedToll.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Location</h3>
                        <p className="text-gray-600">
                          {selectedToll.location.address}, {selectedToll.location.city}, {selectedToll.location.state}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900">Price Chart</h3>
                        <div className="mt-2 border rounded-md overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Vehicle Type
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Price
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Two Wheeler</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${selectedToll.priceChart['two-wheeler']}</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Car</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${selectedToll.priceChart.car}</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Bus</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${selectedToll.priceChart.bus}</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Truck</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${selectedToll.priceChart.truck}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900">Status</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`h-3 w-3 rounded-full ${selectedToll.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-gray-600">
                            {selectedToll.isActive ? 'Open' : 'Closed'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Link to={`/book?tollId=${selectedToll.id}`}>
                          <Button className="w-full bg-tollBlue-500 hover:bg-tollBlue-600">
                            Book Ticket
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-800">Toll Gate Details</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
                    <MapPin size={48} className="text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Toll Selected</h3>
                    <p className="text-gray-500">
                      Select a toll gate from the map to view details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
