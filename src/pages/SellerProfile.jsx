import React, {useState, useEffect} from 'react';
import api from '../services/api';
import {useNavigate} from 'react-router-dom';

const SellerProfile = () => {
    const[formData, setFormData] = useState({
        storeName: '',
        storeDescription: '',
         storeLogo: '',
         storeAddress: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/users/me').then((res)=> {
            const {storeName, storeDescription, storeLogo, storeAddress} = res.data;
            setFormData({storeName, storeDescription, storeLogo, storeAddress});
        });
    }, []);

    const handleChange =(e) => {
        setFormData({...formData, [e.target.name]: e.target.value});

        const handleSubmit = async(e) => {
            e.preventDefault();
            await api.put('/users/profile', formData);
            alert('Store profile updated');
            navigate('/seller/dashboard');
        };
        return(
            <div className='p-2 max-w-xl mx-auto'>
                <h2 className='text-2xl font-bold mb-4'>Edit Store Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
        <input name="storeName" value={formData.storeName} onChange={handleChange} placeholder="Store Name" className="input" />
        <textarea name="storeDescription" value={formData.storeDescription} onChange={handleChange} placeholder="Description" className="input" />
        <input name="storeLogo" value={formData.storeLogo} onChange={handleChange} placeholder="Logo URL" className="input" />
        <input name="storeAddress" value={formData.storeAddress} onChange={handleChange} placeholder="Address" className="input" />
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};
}
export default SellerProfile;