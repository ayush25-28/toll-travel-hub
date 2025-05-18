
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Settings, 
  TicketIcon,
  MapPin, 
  User, 
  DollarSign, 
  ArrowLeft
} from 'lucide-react';

const AdminSidebar: React.FC<{ collapsed: boolean; toggleCollapse: () => void }> = ({ 
  collapsed, 
  toggleCollapse 
}) => {
  const location = useLocation();
  
  const navItems = [
    { 
      icon: Users, 
      label: "Staff", 
      path: "/admin/staff" 
    },
    { 
      icon: User, 
      label: "Customers", 
      path: "/admin/customers" 
    },
    { 
      icon: MapPin, 
      label: "Toll Gates", 
      path: "/admin/tollgates" 
    },
    { 
      icon: DollarSign, 
      label: "Pricing", 
      path: "/admin/pricing" 
    },
    { 
      icon: TicketIcon, 
      label: "Tickets", 
      path: "/admin/tickets" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/admin/settings" 
    },
  ];

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200 flex items-center gap-4">
        <div className="w-10 h-10 bg-tollBlue-500 rounded-md flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        {!collapsed && <span className="text-xl font-bold text-tollBlue-800">TollHub Admin</span>}
      </div>
      
      <div className="flex-grow overflow-y-auto py-6">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                  isActive 
                    ? "bg-tollBlue-50 text-tollBlue-700" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={toggleCollapse}
          className="flex items-center gap-3 text-gray-500 hover:text-tollBlue-600 w-full"
        >
          <ArrowLeft size={20} className={`transform transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
      <div className="p-4">
        <Link to="/" className="flex items-center gap-3 text-gray-500 hover:text-tollBlue-600">
          <ArrowLeft size={20} />
          {!collapsed && <span>Exit Admin</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
