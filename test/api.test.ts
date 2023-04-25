import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const INVALID_INVOICE_DATA = {
  id: "invalid-id",
  clientName: "<script>alert('test')</script>",
  items: [{ name: "Item 1", price: "invalid", quantity: "invalid" }],
};

const TEST_INVOICE_DATA = {
  id: "test-id-1",
  clientName: "Test Client",
  items: [
    { name: "Item 1", price: 10, quantity: 2 },
    { name: "Item 2", price: 20, quantity: 1 },
  ],
};

const UPDATED_INVOICE_DATA = {
  clientName: "Updated Client",
  items: [{ name: "Item 3", price: 30, quantity: 3 }],
};

const testCreateInvalidInvoice = async () => {
  try {
    await axios.post(`${API_BASE_URL}/invoices`, INVALID_INVOICE_DATA);
  } catch (error) {
    console.log("Create invalid invoice: Error caught as expected");
  }
};

const testCreateInvoice = async () => {
  const response = await axios.post(`${API_BASE_URL}/invoices`, TEST_INVOICE_DATA);
  console.log("Create invoice:", response.data);
};

const testGetAllInvoices = async () => {
  const response = await axios.get(`${API_BASE_URL}/invoices`);
  console.log("Get all invoices:", response.data);
};

const testGetInvoiceById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/invoices/${id}`);
  console.log(`Get invoice by id (${id}):`, response.data);
};

const testUpdateInvoice = async (id: string) => {
  const response = await axios.put(`${API_BASE_URL}/invoices/${id}`, UPDATED_INVOICE_DATA);
  console.log(`Update invoice (${id}):`, response.data);
};

const testDeleteInvoice = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/invoices/${id}`);
  console.log(`Delete invoice (${id}): successful`);
};

const testNotFoundError = async (id: string) => {
  try {
    await axios.get(`${API_BASE_URL}/invoices/${id}`);
  } catch (error) {
    console.log("Not found error: Error caught as expected");
  }
};

const runTests = async () => {
  await testCreateInvalidInvoice();

  await testCreateInvoice();
  const invoiceId = TEST_INVOICE_DATA.id;

  await testNotFoundError("nonexistent-id");

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