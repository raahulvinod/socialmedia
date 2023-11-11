import express from 'express';
import bodyParser from 'body-parser';
import mongooe from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import dbConnect from './config/dbConnect.js';
import { register } from './controllers/auth.controller.js';
import authRouter from './routes/authRoute.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

//  Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cd(null, 'public/assests');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes
app.post('/auth/register', upload.single('picture'), register);

app.use('/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
