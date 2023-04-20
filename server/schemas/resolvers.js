const { AuthenticationError } = require('apollo-server-express');
const { User, Project } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('projects').populate('collabProjects').populate('comments');
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        users: async () => {
          return User.find().populate('projects');
        },
        user: async (parent, { username }) => {
          return User.findOne({ username }).populate('projects').populate('collabProjects').populate('comments')
        },
        projects: async (parent, { username }) => {
          const params = username ? { username } : {};
          return Project.find(params)
        },
        project: async (parent, { projectId }) => {
          return Project.findOne({ _id: projectId }).populate('collaborators.collaboratorInfo').populate('comments') 
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
              // creator: context.user.username,
            });

            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { projects: project._id } }
            );
            return project;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
        editProject: async (parent, { projectId, title, description, fundingGoal, repo }, context) => {
          // if(context.user) {
            return Project.findOneAndUpdate(
              {_id: projectId},
              {title, description, fundingGoal, repo}
            )
          // }
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
        },

        editProfile: async(parent, {userId, bio, github, linkedin}, context) => {
          if (context.user) 
          {
            return User.findOneAndUpdate(
              { _id: userId },
              {bio, linkedin, github},
            
            )
            }
        },

        addComment: async(parent, {projectId, commentText }, context) => {
          // if(context.user)
          
            const project = await Project.findOneAndUpdate(
              {_id: projectId},
              {
                $addToSet: {
                  comments: {commentText, commentAuthor: context.user._id}
                }
              },
              {
                new: true,
                runValidators: true,
              }
            )
            await User.findOneAndUpdate(
              {_id: context.user._id},
              {$addToSet:{
                comments: {_id: commentId}
              }});
              return project

            
          
          // throw new AuthenticationError("You must be logged in to comment")
        } 


    }
};

module.exports = resolvers;