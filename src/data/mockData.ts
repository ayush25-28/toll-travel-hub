
// Mock data structures to simulate database

// Staff data structure
export interface Staff {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'support';
  tollGateId: string;
  joinDate: string;
  isActive: boolean;
}

// Customer data structure
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: 'two-wheeler' | 'car' | 'bus' | 'truck';
  registrationDate: string;
  balance: number;
}

// Toll Gate data structure
export interface TollGate {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
  };
  priceChart: {
    'two-wheeler': number;
    'car': number;
    'bus': number;
    'truck': number;
  };
  isActive: boolean;
  staffCount: number;
}

// Toll Ticket data structure
export interface TollTicket {
  id: string;
  customerId: string;
  tollGateId: string;
  vehicleNumber: string;
  vehicleType: 'two-wheeler' | 'car' | 'bus' | 'truck';
  issueDate: string;
  expiryDate: string;
  amount: number;
  isVerified: boolean;
  verifiedBy?: string;
  verificationTime?: string;
}

// Feedback data structure
export interface Feedback {
  id: string;
  customerId: string;
  tollGateId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  submitDate: string;
  isResolved: boolean;
}

// Mock data
export const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    tollGateId: '1',
    joinDate: '2023-01-15',
    isActive: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'operator',
    tollGateId: '1',
    joinDate: '2023-02-20',
    isActive: true
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'support',
    tollGateId: '2',
    joinDate: '2023-03-10',
    isActive: false
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '555-1234',
    vehicleNumber: 'AB1234',
    vehicleType: 'car',
    registrationDate: '2023-02-05',
    balance: 500
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '555-5678',
    vehicleNumber: 'CD5678',
    vehicleType: 'two-wheeler',
    registrationDate: '2023-03-15',
    balance: 200
  },
  {
    id: '3',
    name: 'Carol Martinez',
    email: 'carol@example.com',
    phone: '555-9012',
    vehicleNumber: 'EF9012',
    vehicleType: 'truck',
    registrationDate: '2023-04-20',
    balance: 1000
  }
];

export const mockTollGates: TollGate[] = [
  {
    id: '1',
    name: 'Main Highway Toll',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Highway St',
      city: 'San Francisco',
      state: 'CA'
    },
    priceChart: {
      'two-wheeler': 10,
      'car': 20,
      'bus': 40,
      'truck': 50
    },
    isActive: true,
    staffCount: 5
  },
  {
    id: '2',
    name: 'East Bridge Toll',
    location: {
      latitude: 37.8044,
      longitude: -122.2711,
      address: '456 Bridge Ave',
      city: 'Oakland',
      state: 'CA'
    },
    priceChart: {
      'two-wheeler': 5,
      'car': 15,
      'bus': 30,
      'truck': 40
    },
    isActive: true,
    staffCount: 3
  },
  {
    id: '3',
    name: 'South Expressway Toll',
    location: {
      latitude: 37.3382,
      longitude: -121.8863,
      address: '789 Expressway Blvd',
      city: 'San Jose',
      state: 'CA'
    },
    priceChart: {
      'two-wheeler': 8,
      'car': 18,
      'bus': 35,
      'truck': 45
    },
    isActive: false,
    staffCount: 0
  }
];

export const mockTickets: TollTicket[] = [
  {
    id: '1',
    customerId: '1',
    tollGateId: '1',
    vehicleNumber: 'AB1234',
    vehicleType: 'car',
    issueDate: '2023-05-10T09:30:00',
    expiryDate: '2023-05-10T23:59:59',
    amount: 20,
    isVerified: true,
    verifiedBy: '2',
    verificationTime: '2023-05-10T10:15:00'
  },
  {
    id: '2',
    customerId: '2',
    tollGateId: '2',
    vehicleNumber: 'CD5678',
    vehicleType: 'two-wheeler',
    issueDate: '2023-05-11T14:20:00',
    expiryDate: '2023-05-11T23:59:59',
    amount: 5,
    isVerified: false
  },
  {
    id: '3',
    customerId: '3',
    tollGateId: '1',
    vehicleNumber: 'EF9012',
    vehicleType: 'truck',
    issueDate: '2023-05-12T11:05:00',
    expiryDate: '2023-05-12T23:59:59',
    amount: 50,
    isVerified: true,
    verifiedBy: '1',
    verificationTime: '2023-05-12T11:25:00'
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    customerId: '1',
    tollGateId: '1',
    rating: 4,
    comment: 'Quick service, but the area could be cleaner.',
    submitDate: '2023-05-10T15:00:00',
    isResolved: true
  },
  {
    id: '2',
    customerId: '2',
    tollGateId: '2',
    rating: 2,
    comment: 'Long wait time, need more staff during peak hours.',
    submitDate: '2023-05-11T18:30:00',
    isResolved: false
  },
  {
    id: '3',
    customerId: '3',
    tollGateId: '1',
    rating: 5,
    comment: 'Excellent service, very efficient.',
    submitDate: '2023-05-12T12:45:00',
    isResolved: true
  }
];

// Data structure operations
export class DataStore<T extends { id: string }> {
  private items: T[];

  constructor(initialItems: T[]) {
    this.items = [...initialItems];
  }

  getAll(): T[] {
    return [...this.items];
  }

  getById(id: string): T | undefined {
    return this.items.find(item => item.id === id);
  }

  add(item: T): void {
    if (!this.getById(item.id)) {
      this.items.push(item);
    }
  }

  update(id: string, updatedItem: Partial<T>): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updatedItem };
    }
  }

  delete(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }
}

// Initialize data stores
export const staffStore = new DataStore<Staff>(mockStaff);
export const customerStore = new DataStore<Customer>(mockCustomers);
export const tollGateStore = new DataStore<TollGate>(mockTollGates);
export const ticketStore = new DataStore<TollTicket>(mockTickets);
export const feedbackStore = new DataStore<Feedback>(mockFeedback);
