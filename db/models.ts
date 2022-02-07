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

const User = mongoose.model('User', user);
export default { User };
