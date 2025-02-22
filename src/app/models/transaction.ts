export interface Transaction {
  name: string;
  id?: string;
  type: string;
  category: string;
  value: number;
  created?: string;
  updated?: string;
  description?: string;
  userId: string;
}

export class TransactionModel implements Transaction {
  name: string;
  id?: string;
  type: string;
  category: string;
  value: number;
  created?: string;
  updated?: string;
  description?: string;
  userId: string;

  constructor(transaction: Transaction) {
    this.name = transaction.name;
    this.id = transaction.id;
    this.type = transaction.type;
    this.category = transaction.category;
    this.value = transaction.value;
    this.created = transaction.created;
    this.created = transaction.created?.split('T')[0]; // Extrai apenas a data (YYYY-MM-DD)
    this.updated = transaction.updated?.split('T')[0];
    this.userId = transaction.userId;
  }

  get itemTransaction() {
    return {
      name: this.name,
      id: this.id,
      type: this.type,
      category: this.category,
      value: this.value,
      created: this.created,
      updated: this.updated,
      description: this.description,
      userId: this.userId,
    };
  }
}
