import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import testimoniesRouter from './routers/testimonies';
import passport from 'passport';

config();

const port = 2000;
const host = '127.0.0.1';
const app = express();

const uri = process.env.ALTAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => console.log('Connection to mongoDB established'));

//Tools
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.authenticate('session'));

//Routers
app.use('/users', usersRouter);
app.use('/testimonies', testimoniesRouter);

app.get('/', async (req, res) => res.send('Hello world'));

app.listen(port, host, () => `Listening to ${host}/${port}`);
