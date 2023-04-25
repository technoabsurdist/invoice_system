import { Invoice } from "./invoice";

class InvoiceService {
  private invoices: Invoice[] = [];

  public create(invoice: Invoice): Invoice {
    this.invoices.push(invoice);
    return invoice;
  }

  public getAll(): Invoice[] {
    return this.invoices;
  }

  public getById(id: string): Invoice | null {
    const invoice = this.invoices.find((inv) => inv.id === id);
    return invoice || null;
  }

  public update(id: string, newInvoiceData: Partial<Invoice>): Invoice | null {
    const invoiceIndex = this.invoices.findIndex((inv) => inv.id === id);
    if (invoiceIndex === -1) return null;

    const updatedInvoice = { ...this.invoices[invoiceIndex], ...newInvoiceData };
    this.invoices.splice(invoiceIndex, 1, updatedInvoice);
    return updatedInvoice;
  }

  public delete(id: string): boolean {
    const invoiceIndex = this.invoices.findIndex((inv) => inv.id === id);
    if (invoiceIndex === -1) return false;

    this.invoices.splice(invoiceIndex, 1);
    return true;
  }
}

export const invoiceService = new InvoiceService();