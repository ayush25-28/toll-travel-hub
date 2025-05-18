
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-tollBlue-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-2xl font-bold text-tollBlue-800">TollHub</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-tollBlue-500 font-medium">
            Home
          </Link>
          <Link to="/search" className="text-gray-600 hover:text-tollBlue-500 font-medium">
            Find Toll
          </Link>
          <Link to="/feedback" className="text-gray-600 hover:text-tollBlue-500 font-medium">
            Feedback
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/admin">
            <Button variant="outline" className="text-tollBlue-600 border-tollBlue-300 hover:bg-tollBlue-50">
              Admin Portal
            </Button>
          </Link>
          <Link to="/book">
            <Button className="bg-tollBlue-500 hover:bg-tollBlue-600">
              Book Ticket
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
