import express from "express";
import validator from "validator";
import rateLimit from "express-rate-limit";


/**
 * @param req request object
 * @param res response object
 * @param next next function
 * @returns status 400 if invalid data, otherwise calls next()
*/
export const validateInvoiceData = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { clientName, items } = req.body;
  
    if (!clientName || typeof clientName !== "string") {
      return res.status(400).json({ error: "Invalid clientName" });
    }
    
    req.body.clientName = validator.escape(clientName);

    // security -- validate items
    items.forEach((item: { name: string; }, index: string | number) => {
        req.body.items[index].name = validator.escape(item.name);
    });

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

/* Limit api usage for security */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
});