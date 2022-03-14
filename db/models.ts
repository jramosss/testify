import mongoose, { Schema } from 'mongoose';

const user = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 25,
  },
  alias: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    minlength: 6,
    maxlength: 80,
  },
  created_at: {
    type: Date,
    default: Date(),
  },
});

const testimony = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: 'Chuls',
  },
  created_at: {
    type: Date,
    default: Date(),
  },
  content: {
    type: String,
    required: true,
  },
  last_edit: {
    type: Date,
    default: Date(),
  },
  //TODO topics
});

const User = mongoose.model('User', user);
const Testimony = mongoose.model('Testimony', testimony);

export default { User, Testimony };
