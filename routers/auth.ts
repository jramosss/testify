import crypto from 'crypto';
import passport from 'passport';
import { Router } from 'express';
import localStrategy from 'passport-local';

const router = Router();

passport.use(
  new localStrategy(function verify(
    username: string,
    password: string,
    cb: any
  ) {})
);
