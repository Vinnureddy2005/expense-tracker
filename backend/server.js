const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const SECRET = 'kjhgfdxfcghjklmjnhbj'; // store securely in production

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/expenses_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

// === Schemas ===

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Expense Schema
const expenseSchema = new mongoose.Schema({
    user_id: String,
    amount: Number,
    category: String,
    description: String,
    date: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
});
const Expense = mongoose.model('Expense', expenseSchema);

// === Auth Middleware ===
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// === Auth Routes ===

// POST /register


app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Registering:", req.body); // 👈 add this

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashed });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        console.error(err); // 👈 log any server-side errors
        res.status(400).json({ error: err.message });
    }
});


// POST /login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// === Expense Routes (Protected) ===

// Create
app.post('/expenses', auth, async (req, res) => {
    const expense = new Expense({ ...req.body, user_id: req.user.id });
    await expense.save();
    res.status(201).json(expense);
});

// Read (user-specific)
app.get('/expenses', auth, async (req, res) => {
    const expenses = await Expense.find({ user_id: req.user.id }).sort({ date: -1 });
    res.json(expenses);
});

// Update
app.put('/expenses/:id', auth, async (req, res) => {
    const updated = await Expense.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user.id },
        req.body,
        { new: true }
    );
    res.json(updated);
});

// Delete
app.delete('/expenses/:id', auth, async (req, res) => {
    await Expense.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    res.json({ message: 'Expense deleted' });
});

// Analytics
app.get('/expenses/analytics', auth, async (req, res) => {
    const result = await Expense.aggregate([
        { $match: { user_id: req.user.id } },
        {
            $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" }
            }
        }
    ]);
    res.json(result);
});

app.get('/expenses/monthly', auth, async (req, res) => {
    const result = await Expense.aggregate([
        { $match: { user_id: req.user.id } },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m", date: "$date" }
                },
                total: { $sum: "$amount" }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    // Format to: [{ month: '2025-06', total: 500 }, ...]
    const formatted = result.map(item => ({
        month: item._id,
        total: item.total
    }));
    res.json(formatted);
});

app.get('/expenses/category-breakdown', auth, async (req, res) => {
    const result = await Expense.aggregate([
        { $match: { user_id: req.user.id } },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        },
        { $sort: { total: -1 } }
    ]);
    res.json(result);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
