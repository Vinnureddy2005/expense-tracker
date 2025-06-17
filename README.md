# 💰 Expense Tracker App

A full-stack Expense Tracker built using **React.js** (frontend), **Node.js + Express** (backend), and **MongoDB** (database).  
It allows users to register/login, add/update/delete expenses, and view analytics in the form of a pie chart.

---

## 🚀 Features

- User authentication with JWT
- Add, edit, and delete expenses
- Expense list with categories and descriptions
- Pie chart analytics by category (Chart.js)
- Responsive UI with TailwindCSS
- Secure REST API using Express and MongoDB

---


---

## 🧑‍💻 Tech Stack

- Frontend: React, Tailwind CSS, Chart.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Libraries: bcrypt, cors, body-parser, mongoose

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker

### 2. Backend Setup
cd backend
npm install
node server.js
Make sure MongoDB is running locally on mongodb://localhost:27017/expenses_db

### 3. Frontend Setup

cd frontend
npm install
npm start
App will run on http://localhost:3000


📊 Analytics
View spending by category using an interactive Pie chart powered by react-chartjs-2.

🔒 Authentication
Passwords are hashed using bcrypt

JWT is stored in localStorage and used in Authorization header for API access

📌 Sample User Registration & Login
Use /register and /login endpoints or the frontend form to create an account.

📝 License
This project is open-source and free to use.


