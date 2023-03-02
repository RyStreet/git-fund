const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    login,
    saveProject,
    removeProject,
} = require('../../controllers/user-controller');
// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveProject);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/project/:projectID').delete(authMiddleware, removeProject);