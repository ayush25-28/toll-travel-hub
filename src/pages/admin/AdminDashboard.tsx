
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from '@/components/ui/StatsCard';
import { mockStaff, mockCustomers, mockTollGates, mockTickets } from '@/data/mockData';
import { Users, TicketIcon, MapPin, User, DollarSign, AlertCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Calculate stats with empty data handling
  const activeStaff = mockStaff.filter(staff => staff.isActive).length;
  const activeGates = mockTollGates.filter(gate => gate.isActive).length;
  const verifiedTickets = mockTickets.filter(ticket => ticket.isVerified).length;
  const revenue = mockTickets.reduce((total, ticket) => total + ticket.amount, 0);
  
  // Get recent tickets
  const recentTickets = [...mockTickets]
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Active Staff" 
          value={activeStaff}
          icon={<Users size={24} />}
        />
        <StatsCard 
          title="Customers" 
          value={mockCustomers.length}
          icon={<User size={24} />}
        />
        <StatsCard 
          title="Active Toll Gates" 
          value={activeGates}
          icon={<MapPin size={24} />}
        />
        <StatsCard 
          title="Revenue" 
          value={`$${revenue}`}
          icon={<DollarSign size={24} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="bg-gray-50 flex flex-row items-center justify-between">
            <CardTitle className="text-gray-800">Recent Tickets</CardTitle>
            <span className="text-sm text-gray-500">{mockTickets.length} total</span>
          </CardHeader>
          <CardContent className="p-0">
            {recentTickets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.vehicleNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.vehicleType.charAt(0).toUpperCase() + ticket.vehicleType.slice(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(ticket.issueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${ticket.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ticket.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ticket.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">No Tickets Found</h3>
                <p className="text-gray-500 mt-2">
                  Ticket data will appear here once database is connected.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-gray-800">Gate Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {mockTollGates.length > 0 ? (
              mockTollGates.map(gate => (
                <div key={gate.id} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{gate.name}</span>
                    <span className="text-sm font-medium text-gray-700">
                      ${mockTickets
                        .filter(ticket => ticket.tollGateId === gate.id)
                        .reduce((total, ticket) => total + ticket.amount, 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-tollBlue-500 h-2.5 rounded-full" 
                      style={{ 
                        width: `${Math.min(
                          100, 
                          (mockTickets.filter(ticket => ticket.tollGateId === gate.id).length / Math.max(1, mockTickets.length)) * 100
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <MapPin className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">No Toll Gates Found</h3>
                <p className="text-gray-500 mt-2">
                  Gate performance will appear here once database is connected.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
