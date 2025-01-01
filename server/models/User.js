import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  darktheme: { // false = light; true = dark
    type: Boolean,
    required: true,
    default: true,
  },
  savedpresets: {
    type: [
      {
        key: { type: String, required: true }, // string field for key
        value: { type: mongoose.Schema.Types.Mixed, required: true }, // can be any type
      },
    ],
  },
});

export default mongoose.model('User', userSchema);
