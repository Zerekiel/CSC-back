const mongoose = require('mongoose');
const uuidv4 = require('uuid');

const USER_TYPES = [
  'consumer',
  'support',
];
// console.log(typeof USER_TYPES);

module.exports = toString(USER_TYPES);

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4.v4().replace(/-/g, ''), // real version : /\-/g
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

userSchema.statics.createUser = async function (
  firstName,
  lastName,
  type,
  error,
) {
  const user = await this.create({ firstName, lastName, type });
  if (error) {
    throw error;
  }
  return user;
};

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw ({ error: 'No user with this id found' });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = mongoose.model('User', userSchema);
