const router = require('express').Router();
const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/AuthController');
const UserAuthentication = require('../Middlewares/UserAuthentication');
const { allowAdmin, allowCustomer } = require('../Middlewares/Permission');
const {
    validateRegister,
    validateSignup,
    validateUpdate,
    validateUserPermission,
    validateRole
} = require('../Validators/UserValidate');

// router not yet check authentication
router.post('/register', validateRegister,(req, res) => {
    UserController.createUser(req, res);
});
router.post('/login', validateSignup, (req, res) => {
    AuthController.login(req, res);
});
router.get('/all', (req, res) => {
    UserController.getAllUser(req, res);
});

// router have mission check authentication user
router.use(async (req, res, next) => {
    UserAuthentication.authentication(req, res, next);
});
// all of router checked authentication
router.get('/profile',(req, res) => {
    UserController.getUser(req, res);
})
router.put('/profile', validateUpdate,(req, res) => {
    UserController.updateUser(req, res);
})
router.delete('/profile', (req, res) => {
    UserController.deleteUser(req, res);
});
router.post('/logout', (req, res) => {
    AuthController.logout(req, res);
})
router.post('/permission', validateUserPermission,(req, res) => {
    UserController.createUserPermission(req, res);
})
router.post('/role', validateRole,(req, res) => {
    UserController.createUserRole(req, res);
});

module.exports = router;