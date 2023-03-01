const db = require('../config/connection');
const { User, Project } = require('../models');
const userData = require('./userData.json');
const projectData = require('./projectData.json');

db.once('open', async () => {
  try {
    await Project.deleteMany({});
    await User.deleteMany({});

    await User.create(userData);

    for (let i = 0; i < projectData.length; i++) {
      const { _id, projectAuthor } = await Project.create(projectData[i]);
      const user = await User.findOneAndUpdate(
        { username: projectAuthor },
        {
          $addToSet: {
            projects: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
