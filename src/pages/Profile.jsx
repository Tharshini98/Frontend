import React, {useEffect, useState} from 'react';
import axios from '../services/api';

const Profile = () => {
    const [user, setUser] = useState({name: '', email: ''});
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const fetchProfile = async () => {
        try{
            const res = await axios.get('/users/me');
            setUser({name: res.data.name, email: res.data.email});
        } catch (err) {
            console.error('Failed to fetch user profile', err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.put('/users/me', {...user, password});
            setMessage('Profile updated successfully');
            setPassword('');
        } catch (err) {
            setMessage('Failed to update profile');
        }
    };

    return(
        <div className='max-w-xl mx-auto p-6 bg-white rounded shadow'>
            <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>
            {message && <p className='mb-2 text-green-600'>{message}</p>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                placeholder="Name"
                className='w-full border px-4 py-2 rounded'/>
                <input
                type='email'
                value={user.email}
                onChange={(e) => setUser({...user,email: e.target.value})}
                placeholder='Email'
                className='w-full border px-4 py-2 rounded'/>
                  <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password (optional)"
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
            </form>
        </div>
    )
};

export default Profile;