import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
const app = express();

// app.use(cors({
//   // origin: process.env.API,
//   origin:  ['http://localhost:5173', 'https://growtyping.onrender.com'],
//   credentials: true
// }));
// app.options("*", cors());
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.API,
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/AccredianEnterprise/v1/users',userRoutes);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  const statusCode = err?.statusCode || err?.status || 500;
  const message = err?.message || 'Internal Server Error';

  if (res.headersSent) {
    return next(err);
  }

  return res.status(statusCode).json({
    statusCode,
    message,
  });
});


export default app;