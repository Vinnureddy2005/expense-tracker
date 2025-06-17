// import { useState } from 'react';

// const ExpenseForm = ({ onAdd }) => {
//   const [form, setForm] = useState({
//     amount: '',
//     category: '',
//     description: '',
//     date: ''
//   });

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const res = await fetch('http://localhost:5000/expenses', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(form)
//     });

//     const data = await res.json();
//     if (res.ok) {
//       onAdd(data);
//       setForm({ amount: '', category: '', description: '', date: '' });
//     } else {
//       alert(data.error || 'Something went wrong');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-3xl mx-auto bg-white/40 backdrop-blur-md border border-white/30 shadow-xl rounded-3xl p-8 md:p-10 space-y-6 transition-all duration-300"
//     >
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">💰 Add Expense</h2>
//       <p className="text-center text-gray-500 text-sm mb-6">Track your expenses efficiently with style.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Amount */}
//         <div>
//           <label className="block text-gray-600 font-medium mb-2">Amount (₹)</label>
//           <input
//             type="number"
//             name="amount"
//             value={form.amount}
//             onChange={handleChange}
//             placeholder="e.g. 500"
//             className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white/70 shadow-inner"
//             required
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-gray-600 font-medium mb-2">Category</label>
//           <input
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             placeholder="e.g. Food, Transport"
//             className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white/70 shadow-inner"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="md:col-span-2">
//           <label className="block text-gray-600 font-medium mb-2">Description</label>
//           <input
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="e.g. Lunch at Subway with friends"
//             className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white/70 shadow-inner"
//           />
//         </div>

//         {/* Date */}
//         <div className="md:col-span-2">
//           <label className="block text-gray-600 font-medium mb-2">Date</label>
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white/70 shadow-inner"
//             required
//           />
//         </div>
//       </div>

//       <div className="text-center pt-4">
//         <button
//           type="submit"
//           className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:scale-105 transform transition duration-300"
//         >
//           ➕ Add Expense
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ExpenseForm;

import { useState } from 'react';
import '../styles/ExpenseForm.css'; // make sure to create and import this

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:5000/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      onAdd(data);
      setForm({ amount: '', category: '', description: '', date: '' });
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2 className="expense-title">💰 Add Expense</h2>
      <p className="expense-subtitle">Track your expenses efficiently with style.</p>

      <div className="form-grid">
        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 500"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Food, Transport"
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Lunch at Subway with friends"
          />
        </div>

        <div className="form-group full-width">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-submit">
        <button type="submit">➕ Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
