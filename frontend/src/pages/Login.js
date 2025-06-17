import { useState } from 'react';
import { setToken } from '../auth';

const Login = ({ navigate }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      navigate('/dashboard');
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-10 bg-white shadow rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} className="input" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Login</button>
    </form>
  );
};

export default Login;
