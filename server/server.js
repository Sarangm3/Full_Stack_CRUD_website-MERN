const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse incoming requests as JSON
app.use(express.json());

// Products API Routes
app.use('/products', require('./routes/api/products'));

// Start the server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
