import express from "express";
import { invoiceService } from "./invoiceService";

const app = express();
const port = 3000;

app.use(express.json());

/* Get all invoices */
app.get("/invoices", async (_req, res) => {
  const invoices = await invoiceService.getAll();
  res.send(invoices);
});

/* Get an invoice by ID */
app.get("/invoices/:id", async (req, res) => {
  const invoice = await invoiceService.getById(req.params.id);
  if (!invoice) return res.sendStatus(404);
  res.send(invoice);
});

/* Post a new invoice */
app.post("/invoices", async (req, res) => {
  if (!req.body.clientName || !req.body.items) return res.sendStatus(400);
  const invoice = await invoiceService.create(req.body);
  res.send(invoice);
  console.log(invoice);
});

/* Update an existing invoice */
app.put("/invoices/:id", async (req, res) => {
  const updatedInvoice = await invoiceService.update(req.params.id, req.body);
  if (!updatedInvoice) return res.sendStatus(404);
  res.send(updatedInvoice);
});

/* Delete an invoice */
app.delete("/invoices/:id", async (req, res) => {
  const success = await invoiceService.delete(req.params.id);
  if (!success) return res.sendStatus(404);
  res.sendStatus(204); // No content
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});