
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TicketIcon, MapPin, User } from 'lucide-react';
import StatsCard from '@/components/ui/StatsCard';
import { mockTollGates } from '@/data/mockData';

const Index: React.FC = () => {
  const activeTollGates = mockTollGates.filter(gate => gate.isActive).length;

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-tollBlue-500 to-tollBlue-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Smart Toll Management for Seamless Journeys
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Book toll tickets in advance, find nearest toll gates, and manage all your toll-related needs in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book">
                  <Button className="bg-white text-tollBlue-700 hover:bg-gray-100 text-lg px-6 py-6 h-auto">
                    Book Ticket
                  </Button>
                </Link>
                <Link to="/search">
                  <Button variant="outline" className="border-white text-white hover:bg-tollBlue-600 text-lg px-6 py-6 h-auto">
                    Find Toll Gates
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center">
                        <span className="text-tollBlue-700 text-5xl md:text-6xl font-bold">TH</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 animate-bounce w-16 h-16 bg-tollTeal-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              title="Active Toll Gates" 
              value={activeTollGates}
              icon={<MapPin size={24} />}
              change="5% more than last month"
              trend="up"
            />
            <StatsCard 
              title="Daily Transactions" 
              value="5,240"
              icon={<TicketIcon size={24} />}
              change="3% more than yesterday"
              trend="up"
            />
            <StatsCard 
              title="Registered Users" 
              value="29,891"
              icon={<User size={24} />}
              change="12% growth this month"
              trend="up"
            />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose TollHub?</h2>
            <p className="mt-4 text-xl text-gray-600">
              Simplifying your travel with smart toll management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-full bg-tollBlue-100 flex items-center justify-center mb-6">
                <TicketIcon size={28} className="text-tollBlue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Booking</h3>
              <p className="text-gray-600">
                Book toll tickets in advance and save time during your journey.
                Skip the queues and enjoy a hassle-free travel experience.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-full bg-tollTeal-100 flex items-center justify-center mb-6">
                <MapPin size={28} className="text-tollTeal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Nearest Tolls</h3>
              <p className="text-gray-600">
                Easily locate toll gates near you with our interactive map.
                Plan your route efficiently with real-time data.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600">
                Reduce waiting times at toll booths with pre-booked tickets.
                Validate instantly with our quick verification process.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-tollTeal-500 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to streamline your toll experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who are saving time and enjoying hassle-free travel with TollHub.
          </p>
          <Link to="/book">
            <Button className="bg-white text-tollTeal-700 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
