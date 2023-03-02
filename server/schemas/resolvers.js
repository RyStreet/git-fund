const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              data = await User.findOne({ _id: context.user._id }).select('-__v -password');
              return data;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
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
        addProject: async (parent, { name, description, creator, fundingGoal }, context) => { 
          const project = await Project.create({ name, description, creator,  fundingGoal }); 
          console.log(project);
          const pUser = 
          await User.findOneAndUpdate( 
              { _id: creator }, 
              { $addToSet: { projects: project } },
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