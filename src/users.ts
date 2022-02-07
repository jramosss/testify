import { Schema } from 'mongoose';
import Models from '../db/models';

export default class UserUtils {
  async register(username: string, password: string) {
    return new Models.User({
      username: username,
      password: password,
    });
  }
}
