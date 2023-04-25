import express from "express";
import { invoiceService } from "./invoiceService";
import { validateInvoiceData, apiLimiter } from "./helpers";
import CustomError from "./customError";


const app = express();
const port = 3000;

app.use(express.json());

/* Get all invoices */
app.get("/invoices", async (_req, res) => {
    const invoices = await invoiceService.getAll();
    res.send(invoices);
});

/* Get an invoice by ID */
app.get("/invoices/:id", async (req, res, next) => {
    try {
      const invoice = await invoiceService.getById(req.params.id);
      if (!invoice) return next(new CustomError(`Invoice id: ${req.params.id} not found`, 404));
      res.send(invoice);
    } catch (err) {
      next(err);
    }
  });

app.post("/invoices", validateInvoiceData, async (req, res, next) => {
    try {
        const invoice = await invoiceService.create(req.body);
        res.send(invoice);
        console.log(invoice);
    } catch (err) {
        next(err);
    }
});

/* Update an existing invoice */
app.put("/invoices/:id", validateInvoiceData, async (req, res) => {
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



app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
});
  
/* Limit api usage for security */ 
app.use(apiLimiter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});