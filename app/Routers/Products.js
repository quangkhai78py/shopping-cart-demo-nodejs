
const router = require('express').Router();
const ProductController = require('../Controllers/ProductController');
const { validateProduct } = require('../Validators/ProductValidate');
const UserAuthentication = require('../Middlewares/UserAuthentication');
const {  } = require('../Middlewares/Permission');

router.get('/all', (req, res) => {
    ProductController.getProductAll(req, res);
});
router.get('/:id', (req, res) => {
    ProductController.getProduct(req, res);
});
router.get('/category/:id', (req, res) => {
    ProductController.getProductbyCategoryId(req, res);
})
router.get('/size/:id', (req, res) => {
    ProductController.getProductByCategoryId(req, res);
})

// router have mission check authentication user
router.use(async (req, res, next) => {
    UserAuthentication.authentication(req, res, next);
})

router.post('/category', (req, res) => {
    ProductController.createProductCategory(req, res);
});
router.post('/add', validateProduct,(req, res) => {
    ProductController.createProduct(req, res);
})
router.put('/update/:id', validateProduct,(req, res) => {
    ProductController.updateProduct(req, res);
});
router.delete('/delete/:id', (req, res) => {
    ProductController.deleteProduct(req, res);
})


module.exports = router;