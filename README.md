# Invoice Processing API

This is a RESTful API for creating, managing, and processing invoices, implemented using Node.js, Express, and MongoDB. The API allows clients to create invoices, update existing ones, fetch invoices by ID, and delete them.

## Features

- Create invoices with multiple line items
- Update invoices
- Retrieve invoices by ID
- List all invoices
- Delete invoices
- Input validation and sanitization
- Centralized error handling
- Rate limiting

## Tech Stack

- Node.js
- Express
- MongoDB
- TypeScript
- Validator

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/invoice-processing-api.git
```

2. Install dependencies:

```bash
cd invoice-processing-api
npm install
```

3. Update the `src/database.ts` file with your MongoDB connection details:

```typescript
const uri = "mongodb+srv://your_username:your_password@cluster0.mongodb.net/your_database_name?retryWrites=true&w=majority";
```

Replace `your_username`, `your_password`, and `your_database_name` with the appropriate values for your MongoDB instance.

4. Start the development server:

```bash
npm start
```

Your API will be running at `http://localhost:3000`.

## API Endpoints

### `GET /invoices`

Fetch all invoices.

### `GET /invoices/:id`

Fetch an invoice by ID.

### `POST /invoices`

Create a new invoice.

**Request Payload:**

```json
{
  "id": "sample-id-1",
  "clientName": "Test Client",
  "items": [
    {
      "name": "Item 1",
      "price": 10,
      "quantity": 2
    },
    {
      "name": "Item 2",
      "price": 20,
      "quantity": 1
    }
  ]
}
```

### `PUT /invoices/:id`

Update an existing invoice.

**Request Payload:**

```json
{
  "clientName": "Updated Client Name",
  "items": [
    {
      "name": "Updated Item 1",
      "price": 15,
      "quantity": 3
    }
  ]
}
```

### `DELETE /invoices/:id`

Delete an invoice by ID.

## Testing

1. Start your API server with `npm start` if it's not running already.

2. In a new terminal, run the test script with `npm run test-api`.

This script will run a series of tests on your API, including fetching all invoices, creating a new invoice, fetching an invoice by ID, updating an invoice, and deleting an invoice. The results will be logged to the console.

You can modify this script to test different scenarios and validate the API functionality.

## License

This project is licensed under the MIT License.