const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:/myapp')
}

// Define the model for our database collection
const Product = mongoose.model('products', {
  name: String,
  price: Number,
});

// Get a list of all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
}); 

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
}); 

// Create a new product
router.post('/', async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ msg: 'Please include a name and price' });
    }

    const product = new Product({ name, price });
    await product.save();
    res.send(product);
});
  
// Update a product by ID
router.put('/:id', async (req, res) => {
    const { name, price } = req.body;
    console.log(req.body)
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price}, { new: true });
    console.log(product)
    res.send(product);
});
  
// Delete a product by ID
router.delete('/:id', async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
});

module.exports = router;