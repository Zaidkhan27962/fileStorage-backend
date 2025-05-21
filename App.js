import express from 'express';
import connectDB from './config/db.js';
import router from './routes/fileRout.js';
import cors from 'cors';

const app = express();
const PORT =  3000;

// CORS setup: allow requests from your React client
app.use(cors({
  origin: 'https://zaidkhan27962.github.io/FileStorage-App/',
  credentials: true,
}));

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});