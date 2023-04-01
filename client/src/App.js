import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // Fetch the list of products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  // Function to add a new product
  const addProduct = async (product) => {
    const result = await axios.post('http://localhost:5000/products', product);
    console.log(result)
    setProducts([...products, result.data]);
  };

  // Function to update an existing product
  const updateProduct = async (product) => {
    console.log(product)
    const result = await axios.put(`http://localhost:5000/products/${product._id}`, product);
    
    setProducts(products.map(p => (p._id === product._id ? result.data : p)));
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      // Update the list of products in the component's state
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='text-center mb-2'>Product List</h1>
      <ul class="list-group">
      {products.map(product => (
        <li className='list-group-item'>
          <h5>Name : {product.name}</h5>
          <p>Price : {product.price}</p>
          <button className="btn btn-info mr-3" onClick={() => {
            
            const name = document.getElementById('name').value;
            const price = parseInt(document.getElementById('price').value);
          
            const _id = product._id;
            updateProduct({
              name,price,_id
            })}
            }>Edit</button>
          <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
        </li>
      ))}
      </ul>
      
      <h1 className='text-center mb-2'>Add a New Product</h1>
      <form className='mb-2'
        onSubmit={(event) => {
          event.preventDefault();

          addProduct({
            name: event.target.elements.name.value,
            price: event.target.elements.price.value
          });
          event.target.reset();
        }}
      >
        <div className='row mb-2'>
          <div className="col">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" class="form-control"/>
          </div>

          <div className="col">
            <label htmlFor="price">Price:</label>
            <input type="number" name="price" id="price" class="form-control"/>
          </div>
        </div>

        <button type="submit" className='btn btn-primary'>Add Product</button>
      </form>
    </div>
  );
};

export default App;
