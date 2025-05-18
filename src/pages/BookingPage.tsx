
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TollGate, mockTollGates, mockCustomers, TollTicket, ticketStore } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';

const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const tollGateId = searchParams.get('tollId') || '';
  
  const [selectedToll, setSelectedToll] = useState<TollGate | null>(null);
  const [vehicleType, setVehicleType] = useState<'two-wheeler' | 'car' | 'bus' | 'truck'>('car');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulating price calculation
  const ticketPrice = selectedToll ? selectedToll.priceChart[vehicleType] : 0;
  
  useEffect(() => {
    if (tollGateId) {
      const toll = mockTollGates.find(gate => gate.id === tollGateId);
      if (toll) {
        setSelectedToll(toll);
      }
    }
  }, [tollGateId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedToll) {
      toast({
        title: "Error",
        description: "Please select a toll gate",
        variant: "destructive"
      });
      return;
    }
    
    if (!vehicleNumber || !customerName || !customerPhone) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to book ticket
    setTimeout(() => {
      const newTicket: TollTicket = {
        id: `ticket-${Date.now()}`,
        customerId: '1', // In a real app, this would be the logged-in user's ID
        tollGateId: selectedToll.id,
        vehicleNumber,
        vehicleType,
        issueDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours validity
        amount: ticketPrice,
        isVerified: false
      };
      
      ticketStore.add(newTicket);
      
      setIsLoading(false);
      toast({
        title: "Booking Successful",
        description: `Your ticket has been booked for ${selectedToll.name}`,
      });
      
      // Redirect to a success page or ticket details
      navigate('/booking-success');
    }, 1500);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Toll Ticket</h1>
          <p className="text-lg text-gray-600 mt-2">
            Book your toll ticket in advance and save time during your journey
          </p>
        </div>

        {mockTollGates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <AlertTriangle className="h-16 w-16 text-yellow-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No Toll Gates Available</h3>
              <p className="text-gray-500 max-w-md">
                There are currently no toll gates in the system. Once the database is connected, 
                you will be able to book tickets for available toll gates.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="bg-tollBlue-50">
                <CardTitle className="text-tollBlue-800">Ticket Booking Form</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="toll-gate">Select Toll Gate</Label>
                      <Select
                        value={selectedToll?.id || ''}
                        onValueChange={(value) => {
                          const toll = mockTollGates.find(gate => gate.id === value);
                          setSelectedToll(toll || null);
                        }}
                      >
                        <SelectTrigger id="toll-gate" className="w-full">
                          <SelectValue placeholder="Select a toll gate" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTollGates.filter(gate => gate.isActive).map(gate => (
                            <SelectItem key={gate.id} value={gate.id}>
                              {gate.name} - {gate.location.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle-type">Vehicle Type</Label>
                      <Select
                        value={vehicleType}
                        onValueChange={(value: 'two-wheeler' | 'car' | 'bus' | 'truck') => setVehicleType(value)}
                      >
                        <SelectTrigger id="vehicle-type" className="w-full">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle-number">Vehicle Number</Label>
                      <Input 
                        id="vehicle-number"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="Enter vehicle registration number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-name">Your Name</Label>
                      <Input 
                        id="customer-name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-phone">Phone Number</Label>
                      <Input 
                        id="customer-phone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {selectedToll && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Price:</span>
                          <span className="text-xl font-semibold text-gray-900">${ticketPrice}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      type="submit" 
                      className="w-full bg-tollBlue-500 hover:bg-tollBlue-600" 
                      disabled={isLoading || !selectedToll}
                    >
                      {isLoading ? 'Processing...' : 'Book Ticket'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
