
const BaseRipository = require('./BaseRepository');
const Order = require('../Models/Order');
const Cart = require('../Models/Cart');
const Shipment = require('../Models/Shipment');

class OrderRepository extends BaseRipository {
    constructor() {
        super(Order);
        this.order = Order;
        this.cart = Cart;
        this.shipment = Shipment;
    }

    /**
     * @function updateOrder
     * @description this is function update data detail order by id
     * @param id
     * @param data
     * @returns {Promise<awaited Knex.QueryBuilder<TRecord, number>>}
     */
    async updateOrder(orderId, orderData) {
        return await this.order.query()
            .where('id', orderId)
            .update({
                quantity : orderData.quantity,
                sub_total : orderData.sub_total
            });
    }

    /**
     * @function fetchNewOrder
     * @description this is function fetch user_id
     * @param user_id
     * @returns {Promise<Objection.QueryBuilder<this, this[]>[]>}
     */
    async getNewOrder(user_id) {
        return await this.order.query()
            .where('user_id', user_id)
            .select('id', 'quantity', 'sub_total')
    }

    /**
     * @function createOrder
     * @description this is function create order
     * @param data
     * @returns {Promise<void>}
     */
    async createOrder(dataOrder) {
        return  await this.order.query().insert(dataOrder);
    }

    /**
     * @function fetchExistingProductFromCart
     * @description this is function fetch existing product from cart
     * @param dataOrder
     * @returns {Promise<void>}
     */
    async getExistingProductFromCart(dataOrder) {
        // need get array
        return await this.cart.query()
            .where('order_id', dataOrder.order_id)
            .where('product_id', dataOrder.product_id)
            .select('id', 'quantity', 'sub_total')
            .limit(1);
    }

    /**
     * @function getAllFromUserCart
     * @description this is function get all data cart form table cart by user id
     * @param orderId
     * @returns {Promise<void>}
     */
    async getAllFromUserIdCart(orderId) {
        return await this.cart.query()
            .where('order_id', orderId)
            .select('*');
    }

    /**
     * @function getOrderById
     * @description this is function get data order by id
     * @param id
     * @returns {Promise<void>}
     */
    async getOrderById(orderId) {
        return await this.order.query().where('id', orderId).first();
    }

    /**
     * @function getAllFromUsersCurrentCart
     * @description this is function get all cart by user_id
     * @param userId
     * @returns {Promise<void>}
     */
    async getAllFromUsersCurrentCart(userIdCart) {
        return await this.cart.query()
            .join('orders', 'orders.id', '=', 'cart.order_id')
            .where('cart.user_id', userIdCart)
            .select('cart.*')
    }

    /**
     * @function getItemFromUsersCurrentCart
     * @description this is function get item from user current cart
     * @param userId
     * @param productId
     * @returns {Promise<void>}
     */
    async getItemFromUsersCurrentCart(userId, productId) {
        return await this.cart.query()
            .join('orders', 'orders.id', '=', 'cart.order_id')
            .where('cart.user_id', userId)
            .where('cart.product_id', productId)
            .select('cart.*').first();// để nhớ
    }

    /**
     * @function addToCart
     * @description this is function add new cart
     * @param dataOrder
     * @returns {Promise<void>}
     */
    async addToCart(dataOrder) {
       return await this.cart.query().insert(dataOrder);
    }

    /**
     * @function updateCart
     * @description this is function update cart
     * @param data
     * @returns {Promise<void>}
     */
    async updateCart(cartId, dataCart) {
        return await this.cart.query()
            .where('id', cartId)
            .update({
                quantity : dataCart.quantity,
                sub_total : dataCart.sub_total
            });
    }

    /**
     * @function deleteFromCart
     * @description this is function delete data from cart by id cart
     * @param cartId
     * @returns {Promise<void>}
     */
    async deleteFromCart (cartId) {
        return await this.cart.query().where('id', cartId).del();
    }

    /**
     * @function createShipment
     * @description this is function create data shipment
     * @param reqData
     * @returns {Promise<void>}
     */
    async createShipment(reqData) {
        return await this.shipment.query().insert(reqData);
    }

    /**
     * @function getUserShipment
     * @description this is function get data shipment by id
     * @param shipmentId
     * @returns {Promise<void>}
     */
    async getUserShipment(shipmentId) {
        return await this.shipment.query().where('id', shipmentId).first();
    }

    /**
     * @function updateShipment
     * @description this is function update data shipment by id
     * @param id
     * @param data
     * @returns {Promise<void>}
     */
    async updateShipment(shipmentId, data) {
        return await this.shipment.query().where('id', shipmentId).update(data);
    }
}

module.exports = new OrderRepository();