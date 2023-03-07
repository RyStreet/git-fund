const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `userProjects` array in User.js
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  // image: {
  //   type: String,
  // },
  fundingGoal: {
    type: Number,
    required: true,
  },
  creator: { 
    type: String,
    required: true,
    trim: true,
  },
  repo: {
    type: String,
    required: true,
    trim: true,
  },
  fundingEarned: [
    {
      amount: {
        type: Number,
        required: true
      },
      donaterName: {
        type: String,
        required: true
      }
    }
  ],
  collaborators: [
    {
     
      collabNotes: {
        type: String,
        required: true,
      },
      collaboratorInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    },
  ],
  // languages: {
  //   type: String,
  // },
  // category: {
  //   type: String,
  // },

  // comments: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Comment',
  //     commentText: {
  //       type: String,
  //       required: true,
  //       minlength: 1,
  //       maxlength: 280,
  //     },
  //     commentAuthor: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  // follows: {
  //   type: Number,
  // },
});

const Project = model('Project', projectSchema);

module.exports = Project;
