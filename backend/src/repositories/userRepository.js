import User from '../schema/user';
import crudRepository from './crudRepository';

const userRepository = {
  ...crudRepository(User),
  getUserByEmail: async (email) => {
    const user = await User.findOne({ email });
    return user;
  },
  getUserByName: async (name) => {
    const user = await User.findOne({ userName: name });
    return user;
  }
};

export default userRepository;
