import { useState } from 'react';

const Register = ({ navigate }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful! Please login.');
        navigate('/');
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (err) {
      alert('Server error. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-10 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        value={form.username}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        value={form.password}
        required
      />

      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Register
      </button>
    </form>
  );
};

export default Register;
