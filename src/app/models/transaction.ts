export interface Transaction {
  name: string;
  id?: string;
  type: 'IN' | 'OUT';
  category: string;
  value: number;
  date?: Date;
  description?: string;
  userId: string;
}

export class TransactionModel implements Transaction {
  name: string;
  id?: string;
  type: 'IN' | 'OUT';
  category: string;
  value: number;
  date?: Date;
  description?: string;
  userId: string;

  constructor(transaction: Transaction) {
    this.name = transaction.name;
    this.id = transaction.id;
    this.type = transaction.type;
    this.category = transaction.category;
    this.value = transaction.value;
    this.date = transaction.date;
    this.description = transaction.description;
    this.userId = transaction.userId;
  }

  get itemTransaction() {
    return {
      name: this.name,
      id: this.id,
      type: this.type,
      category: this.category,
      value: this.value,
      date: this.date,
      description: this.description,
      userId: this.userId,
    };
  }
}
