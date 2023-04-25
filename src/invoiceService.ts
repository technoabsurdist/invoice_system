import { Invoice } from "./invoice";
import setupDatabase from "./database";

class InvoiceService {
    /* Database connection */
    private dbPromise: Promise<any>;

    constructor() {
        this.dbPromise = setupDatabase();
    }

    /* Create a new invoice */ 
    async create(invoice: Invoice): Promise<Invoice> {
        const { invoicesCollection, invoiceItemsCollection } = await this.dbPromise;
        await invoicesCollection.insertOne(invoice);
        await invoiceItemsCollection.insertMany(invoice.items.map(item => ({ ...item, invoiceId: invoice.id })));
        return invoice;
    }

    /* Get all invoices */
    async getAll(limit: number, offset: number): Promise<Invoice[]> {
        const { invoicesCollection, invoiceItemsCollection } = await this.dbPromise;

        const invoices = await invoicesCollection.find().toArray();
        const invoiceItems = await invoiceItemsCollection.find().skip(offset).limit(limit).toArray();

        return invoices.map((inv: { id: string; clientName: string; createdAt: string | number | Date; }) => {
        const items = invoiceItems.filter((item: { invoiceId: string; }) => item.invoiceId === inv.id);
        return new Invoice(inv.id, inv.clientName, items);
        });
    }

    /* Get an invoice by id */
    async getById(id: string): Promise<Invoice | null> {
        const { invoicesCollection, invoiceItemsCollection } = await this.dbPromise;

        const invoice = await invoicesCollection.findOne({ id });
        if (!invoice) return null;

        const items = await invoiceItemsCollection.find({ invoiceId: id }).toArray();
        return new Invoice(invoice.id, invoice.clientName, items);
    }

    /* Update an invoice */
    async update(id: string, newInvoiceData: Partial<Invoice>): Promise<Invoice | null> {
        const currentInvoice = await this.getById(id);
        if (!currentInvoice) return null;

        const updatedInvoiceData = { ...currentInvoice, ...newInvoiceData };
        const updatedInvoice = new Invoice(
        updatedInvoiceData.id,
        updatedInvoiceData.clientName,
        updatedInvoiceData.items,
        // updatedInvoiceData.createdAt
        );

        const { invoicesCollection, invoiceItemsCollection } = await this.dbPromise;
        await invoicesCollection.updateOne({ id }, { $set: updatedInvoice });

        await invoiceItemsCollection.deleteMany({ invoiceId: id });
        await invoiceItemsCollection.insertMany(updatedInvoice.items.map(item => ({ ...item, invoiceId: id })));

        return updatedInvoice;
    }

    /* Delete an invoice */
    async delete(id: string): Promise<boolean> {
        const { invoicesCollection, invoiceItemsCollection } = await this.dbPromise;

        const invoice = await invoicesCollection.findOne({ id });
        if (!invoice) return false;

        await invoiceItemsCollection.deleteMany({ invoiceId: id });
        await invoicesCollection.deleteOne({ id });

        return true;
    }
}

export const invoiceService = new InvoiceService();