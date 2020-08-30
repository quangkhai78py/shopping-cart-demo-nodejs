const OrderService = require('../Services/OrderService');
const ApiRepository = require('../Repositories/ApiRepository');

class OrderControllers {
    constructor() {
        this.orderService = OrderService;
        this.apiRepo = ApiRepository;
    }

    /**
     * @function createOrders
     * @description this is function create orders
     * @param req
     * @returns {Promise<void>}
     */
    async createOrders(req, res) {
        let dataOrder = await this.orderService.createOrder(req.body);
        return await this.apiRepo.response(dataOrder, res);
    }

    /**
     * @function getOrder
     * @description this is function get detail order by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getOrder(req, res) {
        let dataOrder = await this.orderService.getOrder(req.params.id);
        return await this.apiRepo.response(dataOrder, res);
    }

    /**
     * @function UpdateOrder
     * @description this is function update data order by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     * @constructor
     */
    async UpdateOrder (req, res) {
        let dataOrder = await this.orderService.updateOrder(req.params.id, req.body);
        return await this.apiRepo.response(dataOrder, res);
    }

    /**
     * @function addToCart
     * @description this is function add to new cart
     * @param req
     * @param res
     * @returns {Promise<void>}id
     */
    async addToCart(req, res) {
        let dataCart = await this.orderService.addToCart(req.user.id, req.body);
        return await this.apiRepo.response(dataCart, res);
    }

    /**
     * @function getCartById
     * @description this is function get cart by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getCartByUserId(req, res) {
        // order id
        let dataCart = await this.orderService.getCartByUserId(req.params.id);
        return await this.apiRepo.response(dataCart, res);
    }

    /**
     * @function getUserCart
     * @description this is function get all cart by user_id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getUserCart (req, res) {
        let dataCart = await this.orderService.getActiveCartByUser(req.params.id);
        return await this.apiRepo.response(dataCart, res);
    }

    /**
     * @function removeFromCart
     * @description this is function remove data from cart
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async removeFromCart(req, res) {
        let dataCart = await this.orderService.getItemFromUsersCurrentCart(req.body);
        return await this.apiRepo.response(dataCart, res);
    }

    /**
     * @function createShipment
     * @description this is function creat shipment
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async createShipment(req, res) {
        let dataShipment = await this.orderService.createShipment(req.body);
        return await this.apiRepo.response(dataShipment, res);
    }

    /**
     * @function getUserShipment
     * @description this is function get user shipment by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getUserShipment(req, res) {
        let dataShipment = await this.orderService.getUserShipment(req.params.id);
        return await this.apiRepo.response(dataShipment, res);
    }

    /**
     * @function updateUserShipment
     * @description this is function update user shipment by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async updateUserShipment(req, res) {
        let dataShipment = await this.orderService.updateUserShipment(req.params.id, req.body);
        return await this.apiRepo.response(dataShipment, res);
    }

}

module.exports = new OrderControllers();

