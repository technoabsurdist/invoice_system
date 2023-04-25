import express from "express";
import { invoiceService } from "./invoiceService";
import { validateInvoiceData, apiLimiter } from "./helpers";
import CustomError from "./customError";
import cors from "cors";

const app = express();
const port = 3000;

const v0_url = "/v0/invoices";
app.use(express.json());
/* Limit api usage for security */ 
app.use(apiLimiter);
/* Allow cross-origin requests */ 
app.use(cors())


/* Get all invoices */
app.get("/v0/invoices", async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const invoices = await invoiceService.getAll(limit, offset);
    res.send(invoices);
});

/* Get an invoice by ID */
app.get(`${v0_url}/:id`, async (req, res, next) => {
    try {
      const invoice = await invoiceService.getById(req.params.id);
      if (!invoice) return next(new CustomError(`Invoice id: ${req.params.id} not found`, 404));
      res.send(invoice);
    } catch (err) {
      next(err);
    }
  });

app.post(v0_url, validateInvoiceData, async (req, res, next) => {
    try {
        const invoice = await invoiceService.create(req.body);
        res.send(invoice);
        console.log(invoice);
    } catch (err) {
        next(err);
    }
});

/* Update an existing invoice */
app.put(`${v0_url}/:id`, validateInvoiceData, async (req, res) => {
    const updatedInvoice = await invoiceService.update(req.params.id, req.body);
    if (!updatedInvoice) return res.sendStatus(404);
    res.send(updatedInvoice);
});

/* Delete an invoice */
app.delete(`${v0_url}/:id`, async (req, res) => {
    const success = await invoiceService.delete(req.params.id);
    if (!success) return res.sendStatus(404);
    res.sendStatus(204); // No content
});


/* Error handling */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
});
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});