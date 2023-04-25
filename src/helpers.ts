import express from "express";

export const validateInvoiceData = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { clientName, items } = req.body;
  
    if (!clientName || typeof clientName !== "string") {
      return res.status(400).json({ error: "Invalid clientName" });
    }
  
    if (
      !Array.isArray(items) ||
      items.some(
        (item) =>
          typeof item.name !== "string" ||
          typeof item.price !== "number" ||
          typeof item.quantity !== "number"
      )
    ) {
      return res.status(400).json({ error: "Invalid items" });
    }
  
    next();
};