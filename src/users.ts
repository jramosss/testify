import { Schema } from 'mongoose';
import Models from '../db/models';

export default class UserUtils {
  async register(username: string, password: string) {
    return new Models.User({
      username: username,
      password: password,
    });
  }

  async get_by_username(username: string) {
    const query = await Models.User.find().where('username').equals(username);
    console.log(`query: ${query}`);
    return query.length === 0 ? undefined : query[0];
  }
}
