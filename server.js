import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import taskRoutes from './routes/routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
        .then(() => app.listen(PORT, () =>
            console.log(`Server running on port ${PORT}`)))
        .catch(err => console.error(err));