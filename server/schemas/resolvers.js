const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              data = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('userProjects');
              return data;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        projects: async (parent, args, context) => {
          return Project.find()
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email }).populate("userProjects");
    
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials!');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        addProject: async (parent, { title, description, fundingGoal, userID }, context) => { 
          const project = await Project.create({ title, description, fundingGoal }); 
          console.log(project);
          const pUser = 
          await User.findOneAndUpdate( 
              { _id: userID }, 
              { $addToSet: { userProjects: project._id } },
              {new: true}
          );
          console.log(pUser)
          return project;
        },
        removeProject: async (parent, { projectId }, context) => {
          if (context.user) {
            const project = await project.findOneAndDelete({
              _id: projectId,
              creator: context.user._id,
            });
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { projects: projectId } }
            );
            return project;
    }
  }
}
};

module.exports = resolvers;