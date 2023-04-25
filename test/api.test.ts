import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const testGetAllInvoices = async () => {
  const response = await axios.get(`${API_BASE_URL}/invoices`);
  console.log("Get all invoices:", response.data);
};

const testCreateInvoice = async () => {
  const invoiceData = {
    id: "test-id",
    clientName: "Test Client",
    items: [
      { name: "Item 1", price: 10, quantity: 2 },
      { name: "Item 2", price: 20, quantity: 1 },
    ],
  };

  const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData);
  console.log("Create invoice:", response.data);
};

const testGetInvoiceById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/invoices/${id}`);
  console.log(`Get invoice by id (${id}):`, response.data);
};

const testUpdateInvoice = async (id: string) => {
  const newInvoiceData = {
    clientName: "Updated Client",
  };

  const response = await axios.put(`${API_BASE_URL}/invoices/${id}`, newInvoiceData);
  console.log(`Update invoice (${id}):`, response.data);
};

const testDeleteInvoice = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/invoices/${id}`);
  console.log(`Delete invoice (${id}): successful`);
};

const runTests = async () => {
  await testGetAllInvoices();

  await testCreateInvoice();
  const invoiceId = "test-id";

  await testGetAllInvoices();
  await testGetInvoiceById(invoiceId);

  await testUpdateInvoice(invoiceId);
  await testGetInvoiceById(invoiceId);

  await testDeleteInvoice(invoiceId);
  await testGetAllInvoices();
};

runTests().catch((error) => {
  console.error("Error during API tests:", error.message);
});