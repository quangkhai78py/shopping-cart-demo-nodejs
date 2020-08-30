
const router = require('express').Router();
const BlogController = require('../Controllers/BlogController');
const { validateBlog } = require('../Validators/BlogValidate');
const UserAuthentication = require('../Middlewares/UserAuthentication');

router.get('/all', (req,res) => {
    BlogController.getBlogAll(req, res);
})
router.get('/:id', (req, res,) => {
    BlogController.getBlogById(req, res);
});
router.get('/category/:id', (req, res) => {
    BlogController.getBlogByCategoryId(req, res);
});

// router have mission check authentication user
router.use(async (req, res, next) => {
    UserAuthentication.authentication(req, res, next);
});
router.post('/create', validateBlog,(req, res) => {
   BlogController.createBlog(req, res);
});
router.put('/update/:id', validateBlog,(req, res) => {
    BlogController.updateBlog(req, res);
});
router.delete('/delete/:id', (req, res) => {
   BlogController.deleteBlog(req, res);
});

module.exports = router