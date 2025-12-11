import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/mongoDB.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import geminiResponse from './gemini.js';

const app = express();
const PORT = process.env.POST || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Server is running....')
// });


// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', async (req, res) => {
    let prompt = req.query.prompt;
    let data = await geminiResponse(prompt)

    res.json(data)
})

connectDB();

app.listen(PORT, () => {
    console.log(`Server is Running on PORT: http://localhost:${PORT}`)
});
