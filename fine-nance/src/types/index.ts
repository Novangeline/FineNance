export type Spending = {
  id: string;
  created_at: string;
  date: string;
  name: string;
  cost: number;
  category: string;
};

export type NewSpending = Omit<Spending, 'id' | 'created_at'>;