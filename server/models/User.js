const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    collabProjects: [ 
      {
        type: Schema.Types.ObjectId,
        ref: "Project"
      }
    ],
    
    bio: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    github:{
      type: String,
      trim: true
    }
  },
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  // }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
