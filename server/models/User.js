const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // email: {
  //   type: String,
  //   required: true
  // },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  roles:
    [{
      type: String
    }],
  enrolledCourses:
    [{
      type:Schema.Types.ObjectId,
      ref:'Course'
    }]
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.password;
  },
  isInRole: function (role) {
    return this.roles.indexOf(role) !== -1;
  }
})


const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, 'Admin');
    return User.create({
      username: 'Admin',
      email: 'admin@admin.bg',
      salt,
      hashedPassword,
      roles: ['Admin']
    });
  } catch (e) {
    console.log(e);
  }
};


module.exports = User