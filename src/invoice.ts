export class Invoice {
    id: string;
    clientName: string;
    items: { name: string; price: number; quantity: number }[];
    totalAmount: number;
    createdAt: Date;
  
    constructor(
      id: string,
      clientName: string,
      items: { name: string; price: number; quantity: number }[],
      createdAt?: Date
    ) {
      this.id = id;
      this.clientName = clientName;
      this.items = items;
      this.totalAmount = this.calculateTotalAmount();
      this.createdAt = createdAt || new Date();
    }
  
    private calculateTotalAmount(): number {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}