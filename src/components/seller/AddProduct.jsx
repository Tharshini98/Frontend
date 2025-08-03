import React, {useState} from 'react';
import axios from '../../services/api';

const AddProduuct = () => {
    const[form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',

    });

    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value});
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post('/products/add', form);
            alert('Product added!');
        } catch (err) {
            console.error(err);
            alert('Error adding product');
        }
    };
    return(
        <form onSubmit={handleSubmit} className='p-4 bg-white shadow-md rounded'>
            <input name='name' placeholder='Name' onChange={handleChange} required />
            <textarea name='description' placeholder='Description' onChange={handleChange} />
            <input name='price' type='number' placeholder='Price' onChange={handleChange} required/>
            <input name='category' placeholder='Category' onChange={handleChange} required/>
            <input name='image' placeholder='Image URL' onChange={handleChange}/>
            <input name='stock' type='number' placeholder='Stock' onChange={handleChange}/>
            <button type='submit' className='mt-2 bg-blue-500 text-white px-4 py-1 rounded'>Add Product</button>
        </form>
    );
};

export default AddProduct;