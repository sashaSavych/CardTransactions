export interface Transaction {
  _id?: string;
  id: string;
  cardHolderHash: string;
  datetime: string;
  amount: number;
}
