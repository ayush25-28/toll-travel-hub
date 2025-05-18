
// Data structures to be used with a real database connection

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

// Empty data collections
export const mockStaff: Staff[] = [];
export const mockCustomers: Customer[] = [];
export const mockTollGates: TollGate[] = [];
export const mockTickets: TollTicket[] = [];
export const mockFeedback: Feedback[] = [];

// Data structure operations - can be replaced with actual database operations later
export class DataStore<T extends { id: string }> {
  private items: T[];

  constructor(initialItems: T[] = []) {
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

// Initialize empty data stores
export const staffStore = new DataStore<Staff>([]);
export const customerStore = new DataStore<Customer>([]);
export const tollGateStore = new DataStore<TollGate>([]);
export const ticketStore = new DataStore<TollTicket>([]);
export const feedbackStore = new DataStore<Feedback>([]);
