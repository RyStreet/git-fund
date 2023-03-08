const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('projects').populate('collabProjects');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
          return User.find().populate('projects');
        },
        user: async (parent, { username }) => {
          return User.findOne({ username }).populate('projects')
        },
        projects: async (parent, { username }) => {
          const params = username ? { username } : {};
          return Project.find(params)
        },
        project: async (parent, { projectId }) => {
          return Project.findOne({ _id: projectId }).populate('collaborators.collaboratorInfo') ////testing with adding collaborators ; 
        }
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
        addProject: async (parent, { title, description, fundingGoal, repo }, context) => { 
          if (context.user) {

            const project = await Project.create({ title, description, fundingGoal, repo, creator: context.user.username }); 
            console.log(project);

            await User.findOneAndUpdate( 
                { _id: context.user._id }, 
                { $addToSet: { projects: project._id } },
                // {new: true}
            );
            return project;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        removeProject: async (parent, { projectId }, context) => {
          if (context.user) {
            const project = await Project.findOneAndDelete({
              _id: projectId,
              creator: context.user.username,
            });

            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { projects: project._id } }
            );
            return project;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        addCollaborator: async (parent, { projectId, collabNotes }, context) => {
          
          if (context.user) {
            const project = await Project.findOneAndUpdate(
              { _id: projectId },
              { 
                $addToSet: {
                  collaborators: { collabNotes, collaboratorInfo: context.user._id }
                } 
              },
              { 
                new: true,
                runValidators: true,
              }
              
              )
              await User.findOneAndUpdate(
                {_id: context.user._id },
                {$addToSet:{
                  collabProjects: {_id: projectId}
                }});
                return project
                
          }
          throw new AuthenticationError("You must be logged in!")
        },
        
        addDonation: async(parent, {projectId, amount}, context) => {
          if (context.user) {
            return Project.findOneAndUpdate(
              {_id: projectId},
              {$addToSet: {
                fundingEarned: {amount, donaterName: context.user.username}
              }
            },
            {runValidators: true,}
            );
          }
          throw new AuthenticationError("You must be logged in!")
        }
    }
};

module.exports = resolvers;