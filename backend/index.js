import express from 'express';
import { PORT } from './src/config/serverConfig.js';
import { StatusCodes } from 'http-status-codes';
import connectDB from './src/config/dbConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'pong'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
