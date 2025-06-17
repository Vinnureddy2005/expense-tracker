

// import { useEffect, useState } from 'react';

// const ExpenseList = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const loadExpenses = async () => {
//     const token = localStorage.getItem('token');
//     const res = await fetch('http://localhost:5000/expenses', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setExpenses(data);
//   };

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     await fetch(`http://localhost:5000/expenses/${id}`, {
//       method: 'DELETE',
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     loadExpenses();
//   };

//   const handleEditClick = (expense) => {
//     setEditing(expense);
//     setModalOpen(true);
//   };

//   const handleEditChange = (e) => {
//     setEditing({ ...editing, [e.target.name]: e.target.value });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     await fetch(`http://localhost:5000/expenses/${editing._id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(editing),
//     });
//     setModalOpen(false);
//     loadExpenses();
//   };

//   useEffect(() => {
//     loadExpenses();
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-6">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Expenses</h2>

//       {expenses.length === 0 ? (
//         <p className="text-gray-500">No expenses found.</p>
//       ) : (
//         <div className="space-y-4">
//           {expenses.map((e) => (
//             <div
//               key={e._id}
//               className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:shadow-sm transition"
//             >
//               <div>
//                 <p className="font-medium text-gray-800">{e.category}</p>
//                 <p className="text-sm text-gray-600">
//                   ₹{e.amount} • {e.description}
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEditClick(e)}
//                   className="text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(e._id)}
//                   className="text-red-600 hover:text-red-800 font-medium"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Edit Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Expense</h2>
//             <form onSubmit={handleEditSubmit} className="space-y-3">
//               <input
//                 type="number"
//                 name="amount"
//                 value={editing.amount}
//                 onChange={handleEditChange}
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Amount"
//               />
//               <input
//                 name="category"
//                 value={editing.category}
//                 onChange={handleEditChange}
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Category"
//               />
//               <input
//                 name="description"
//                 value={editing.description}
//                 onChange={handleEditChange}
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Description"
//               />
//               <input
//                 type="date"
//                 name="date"
//                 value={editing.date?.split('T')[0]}
//                 onChange={handleEditChange}
//                 className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setModalOpen(false)}
//                   className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpenseList;

import { useEffect, useState } from 'react';
import '../styles/ExpenseList.css'; // ← Import your styles

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadExpenses = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/expenses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setExpenses(data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/expenses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    loadExpenses();
  };

  const handleEditClick = (expense) => {
    setEditing(expense);
    setModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/expenses/${editing._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editing),
    });
    setModalOpen(false);
    loadExpenses();
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="expense-list-container">
      <h2 className="expense-list-title">Your Expenses</h2>

      {expenses.length === 0 ? (
        <p className="no-expense-msg">No expenses found.</p>
      ) : (
        <div className="expense-list">
          {expenses.map((e) => (
            <div key={e._id} className="expense-item">
              <div>
                <p className="expense-category">{e.category}</p>
                <p className="expense-details">₹{e.amount} • {e.description}</p>
              </div>
              <div className="expense-actions">
                <button onClick={() => handleEditClick(e)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(e._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">Edit Expense</h2>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <input
                type="number"
                name="amount"
                value={editing.amount}
                onChange={handleEditChange}
                placeholder="Amount"
              />
              <input
                name="category"
                value={editing.category}
                onChange={handleEditChange}
                placeholder="Category"
              />
              <input
                name="description"
                value={editing.description}
                onChange={handleEditChange}
                placeholder="Description"
              />
              <input
                type="date"
                name="date"
                value={editing.date?.split('T')[0]}
                onChange={handleEditChange}
              />
              <div className="modal-buttons">
                <button type="button" onClick={() => setModalOpen(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
