
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockTickets, mockCustomers, mockStaff, mockTollGates, ticketStore, TollTicket } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Search, TicketIcon, CheckCircle2, AlertCircle } from 'lucide-react';

const TicketVerification: React.FC = () => {
  const { toast } = useToast();
  const [ticketId, setTicketId] = useState('');
  const [searchedTicket, setSearchedTicket] = useState<TollTicket | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handleSearch = () => {
    if (!ticketId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a ticket ID",
        variant: "destructive"
      });
      return;
    }
    
    const ticket = mockTickets.find(t => t.id === ticketId);
    if (ticket) {
      setSearchedTicket(ticket);
    } else {
      toast({
        title: "Not Found",
        description: "No ticket found with the provided ID",
        variant: "destructive"
      });
      setSearchedTicket(null);
    }
  };

  const handleVerify = () => {
    if (!searchedTicket) return;
    
    setVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedTicket = {
        ...searchedTicket,
        isVerified: true,
        verifiedBy: '1', // Assuming the current admin staff ID is 1
        verificationTime: new Date().toISOString()
      };
      
      ticketStore.update(searchedTicket.id, updatedTicket);
      setSearchedTicket(updatedTicket);
      setVerifying(false);
      
      toast({
        title: "Ticket Verified",
        description: "Ticket has been successfully verified"
      });
    }, 1000);
  };

  // Get customer and toll gate info for the searched ticket
  const customer = searchedTicket 
    ? mockCustomers.find(c => c.id === searchedTicket.customerId) 
    : null;
  
  const tollGate = searchedTicket 
    ? mockTollGates.find(g => g.id === searchedTicket.tollGateId) 
    : null;
  
  const verifiedBy = searchedTicket?.verifiedBy 
    ? mockStaff.find(s => s.id === searchedTicket.verifiedBy) 
    : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ticket Verification</h1>
        <p className="text-gray-500 mt-1">Verify customer tickets at toll gates</p>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Enter ticket ID..." 
                className="pl-10"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} className="bg-tollBlue-500 hover:bg-tollBlue-600">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {searchedTicket ? (
        <Card>
          <CardHeader className={`flex flex-row items-center justify-between p-6 ${
            searchedTicket.isVerified ? 'bg-green-50' : 'bg-yellow-50'
          }`}>
            <CardTitle className={searchedTicket.isVerified ? 'text-green-800' : 'text-yellow-800'}>
              <div className="flex items-center gap-2">
                <TicketIcon size={20} />
                Ticket {searchedTicket.id}
                {searchedTicket.isVerified && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                    Verified
                  </span>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Toll Gate</p>
                  <p className="mt-1 text-base text-gray-900">{tollGate?.name || 'Unknown'}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Vehicle Number</p>
                  <p className="mt-1 text-base text-gray-900">{searchedTicket.vehicleNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Vehicle Type</p>
                  <p className="mt-1 text-base text-gray-900">
                    {searchedTicket.vehicleType.charAt(0).toUpperCase() + searchedTicket.vehicleType.slice(1)}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Issue Date</p>
                  <p className="mt-1 text-base text-gray-900">
                    {new Date(searchedTicket.issueDate).toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                  <p className="mt-1 text-base text-gray-900">
                    {new Date(searchedTicket.expiryDate).toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="mt-1 text-base text-gray-900">${searchedTicket.amount}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Details</h3>
              
              {customer ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="mt-1 text-base text-gray-900">{customer.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1 text-base text-gray-900">{customer.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="mt-1 text-base text-gray-900">{customer.phone}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Customer details not found</p>
              )}
              
              {searchedTicket.isVerified && (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Verification Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Verified By</p>
                      <p className="mt-1 text-base text-gray-900">{verifiedBy?.name || 'Unknown'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Verification Time</p>
                      <p className="mt-1 text-base text-gray-900">
                        {searchedTicket.verificationTime 
                          ? new Date(searchedTicket.verificationTime).toLocaleString() 
                          : 'Unknown'
                        }
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="md:col-span-2">
              {!searchedTicket.isVerified && (
                <Button 
                  onClick={handleVerify} 
                  disabled={verifying}
                  className="bg-green-600 hover:bg-green-700 w-full py-6 h-auto text-lg font-medium"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  {verifying ? 'Verifying...' : 'Verify Ticket'}
                </Button>
              )}
              
              {searchedTicket.isVerified && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 className="text-green-600 h-6 w-6" />
                  <div>
                    <p className="font-medium text-green-800">Ticket Already Verified</p>
                    <p className="text-sm text-green-700">
                      This ticket was verified on {searchedTicket.verificationTime 
                          ? new Date(searchedTicket.verificationTime).toLocaleString() 
                          : 'an unknown date'
                        }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No Ticket Selected</h3>
            <p className="text-gray-500 max-w-md">
              Enter a ticket ID and click search to verify a ticket. 
              When connected to a database, you will be able to search and verify tickets.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketVerification;
