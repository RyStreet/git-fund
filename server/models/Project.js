const { Schema, model } = require('mongoose');


// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `userProjects` array in User.js
const projectSchema = new Schema({
  projectID: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  fundingGoal: {
    type: Number,
    required: true,
    },
    fundingEarned: {
    type: Number,
    },
    languages: {
    type: String,
    },
    category: {
    type: String,
    },
    contributors: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ],
    comments: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    ],
    follows: {
    type: Number,
    },
});
const Project = model('Project', projectSchema);
module.exports = Project;
