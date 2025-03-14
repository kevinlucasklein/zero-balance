export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Debt {
    id: number;
    userId: number;
    creditorName: string;
    amount: number;
    interestRate: number;
    minimumPayment: number;
    dueDate: string;
    status: 'active' | 'paid_off';
    createdAt: string;
  }
  
  export interface IncomeSource {
    id: number;
    userId: number;
    sourceName: string;
    amount: number;
    frequency: 'weekly' | 'biweekly' | 'monthly' | 'irregular';
    nextPayDate: string;
    createdAt: string;
  }
  
  export interface Payment {
    id: number;
    userId: number;
    debtId: number;
    amount: number;
    paymentDate: string;
    method: 'bank_transfer' | 'credit_card' | 'cash' | 'other';
  }
  
  export interface ScheduledPayment {
    id: number;
    userId: number;
    debtId: number;
    recommendedAmount: number;
    scheduledDate: string;
    status: 'pending' | 'completed' | 'skipped';
    createdAt: string;
  }
  