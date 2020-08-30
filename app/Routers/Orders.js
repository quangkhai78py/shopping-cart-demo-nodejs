const router = require('express').Router();
const OrderController = require('../Controllers/OrderControllers');
const { validateOrders, validateShipments } = require('../Validators/OrderValidate');
const UserAuthentication = require('../Middlewares/UserAuthentication');

router.use(async (req, res, next) => {
    UserAuthentication.authentication(req, res, next);
})
// create a defult order.
router.post('/create',validateOrders, (req, res) => {
    OrderController.createOrders(req, res);
});
// get order details by order id
router.get('/detail/:id', (req, res) => {
    OrderController.getOrder(req, res);
});
// update order details by order id
router.put('/detail/:id', validateOrders, (req, res) => {
    OrderController.UpdateOrder(req, res);
});
// add any item into a cart.
router.post('/addToCart', validateOrders, (req, res) => {
    OrderController.addToCart(req, res);
});
// get details of users cart by user id
router.get('/activeCart/:id', (req, res) => {
    OrderController.getUserCart(req, res);
});
// get details of any cart by cart id
router.get('/cart/:id', (req, res) => {
    OrderController.getCartByUserId(req, res);
});
// delete items from cart
router.delete('/removeCart', (req, res) => {
    OrderController.removeFromCart(req, res);
})

// shipments
// create shipment of order
router.post('/ship', validateShipments, (req, res) => {
    OrderController.createShipment(req, res);
});
// get shipment details by shipment id
router.get('/ship/:id', (req, res) => {
    OrderController.getUserShipment(req, res);
});
// update shipment details by shipment id
router.put('/ship/:id', validateShipments,(req, res) => {
    OrderController.updateUserShipment(req, res)
});

module.exports = router;