
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TicketIcon, Download, MapPin } from 'lucide-react';

const BookingSuccessPage: React.FC = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <Card className="border-green-200">
            <CardContent className="pt-6 pb-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h1>
              <p className="text-gray-600 mb-8">
                Your toll ticket has been successfully booked.
              </p>
              
              <div className="bg-gray-50 w-full p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <TicketIcon size={20} className="text-tollBlue-500 mr-2" />
                    <span className="text-gray-900 font-medium">Ticket ID</span>
                  </div>
                  <span className="text-gray-600">TKT-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin size={20} className="text-tollBlue-500 mr-2" />
                    <span className="text-gray-900 font-medium">Toll Gate</span>
                  </div>
                  <span className="text-gray-600">Main Highway Toll</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tollBlue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-900 font-medium">Valid Until</span>
                  </div>
                  <span className="text-gray-600">{new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tollBlue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-900 font-medium">Amount Paid</span>
                  </div>
                  <span className="text-gray-600">$20.00</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button className="flex-1 gap-2">
                  <Download size={18} />
                  Download Ticket
                </Button>
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
