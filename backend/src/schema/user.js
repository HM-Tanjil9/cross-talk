import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'User name is required'],
      unique: [true, 'User name already exists'],
      minLength: [3, 'Username must be at least 3 characters long'],
      match: [
        /^[a-zA-Z0-9]+$/,
        'Username must contain only letters and numbers'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashedPassword;
  user.avatar = `https://robohash.org/${user.username}`;
});

const User = mongoose.model('User', userSchema);

export default User;
