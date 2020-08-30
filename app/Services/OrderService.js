
const OrderRepository = require('../Repositories/OrderRepository');
const { NotificationOrder } = require('../Helpers/Notifications');

class OrderService {
    constructor() {
        this.orderRepo = OrderRepository;
    }

    /**
     * @function createOrder
     * @description this is function create orders
     * @param data
     * @returns {Promise<void>}
     */
    async createOrder(data) {
        try {
            let order = await this.orderRepo.created({ data });
            if (!order) {
                return { ...NotificationOrder.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationOrder.CREATE_SUCCESS, data : order };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getOrder
     * @description this is function get data order detail by id
     * @param idOrder
     * @returns {Promise<void>}
     */
    async getOrder(orderId) {
        try {
            let order = await this.orderRepo.findOneById({ orderId });
            if (!order) {
                return { ...NotificationOrder.ERROR_NOT_FOUND, data : false };
            }
            return { ...NotificationOrder.GET_DATA_SUCCESS, data : order };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function updateOrder
     * @description this is function update data order by id
     * @param id
     * @returns {Promise<{message: string, status: number}>}
     */
    async updateOrder(orderId, data) {
        try {
            let order = await this.orderRepo.updatedOne({ orderId, data });
            if (!order) {
                return { ...NotificationOrder.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationOrder.UPDATE_DATA_SUCCESS, data : order };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function addToCart
     * @description this is function
     * @param data
     * @returns {Promise<void>}
     */
    async addToCart (userId, dataOrder) {
        try {
            // check user_id have in table order
            let newOrder = await this.orderRepo.getNewOrder(userId);
            // if don have user_id, create new order for new user_id
            if (!newOrder || !newOrder.length) {
                await this.orderRepo.createOrder(dataOrder);
                // fetch user_id have in table order
                newOrder = await this.orderRepo.getNewOrder(userId);
            }
            // add new value id user in array dataOrder element order_id
            dataOrder.order_id = newOrder[0].id;
            // get product existing in cart
            let existing = await this.orderRepo.getExistingProductFromCart(dataOrder);
            // if have data update value in cart
            if (existing && existing.length) {
                let dataCart = {
                    id : existing[0].id,
                    quantity : dataOrder.quantity + existing[0].quantity,
                    sub_total : dataOrder.sub_total + existing[0].sub_total
                };
                const tobeUpdate = {};
                const canBeUpdate = ['quantity', 'sub_total'];

                for (let i in dataCart) {
                    if (canBeUpdate.indexOf(i) > -1) {
                        tobeUpdate[i] = dataCart[i];
                    }
                }

                let cartId = dataCart.id;
                let resUpdateToCart = await this.orderRepo.updateCart(cartId, tobeUpdate);
                if (resUpdateToCart) {
                    let updateDetailAddToCart = await this.updateDetailAddToCart(dataOrder, newOrder);
                    if (updateDetailAddToCart) {
                        return { ...NotificationOrder.UPDATE_ADD_TO_CART };
                    }
                }
            } else {
                // if don have add new cart
                let addNewCar = await this.orderRepo.addToCart(dataOrder);
                if (addNewCar) {
                    let updateDetailAddToCart = await this.updateDetailAddToCart(dataOrder, newOrder);
                    if (updateDetailAddToCart) {
                        return { ...NotificationOrder.ADD_NEW_CART };
                    }
                }
            }
        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function updateDetailAddToCart
     * @description this is function update value in table order when add to cart
     * @param dataOrder
     * @param newOrder
     * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
     */
    async updateDetailAddToCart (dataOrder, newOrder) {
        // update value in table order
        let orderData = {
            id : dataOrder.order_id,
            quantity : newOrder[0].quantity + dataOrder.quantity > 0 ? newOrder[0].quantity + dataOrder.quantity : 0,
            sub_total : newOrder[0].sub_total + dataOrder.sub_total > 0 ? newOrder[0].sub_total + dataOrder.sub_total : 0
        };
        return  await this.orderRepo.updateOrder(orderData.id, orderData);
    }

    /**
     * @function fetchUserCart
     * @description this is function get cart by user_id
     * @param reqData
     * @returns {Promise<void>}
     */
    async getCartByUserId(reqData) {
        try {
            let dataCart = await this.orderRepo.getAllFromUserIdCart(reqData);
            if (dataCart.length < 1) {
                return { ...NotificationOrder.ERROR_NOT_FOUND_CART, data : false };
            }
            return { ...NotificationOrder.GET_DATA_SUCCESS, data : dataCart };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getActiveCartByUser
     * @description this is function get all cart by user_id
     * @param reqData
     * @returns {Promise<void>}
     */
    async getActiveCartByUser(userIdCart) {
        try {
            let dataCart = await this.orderRepo.getAllFromUsersCurrentCart(userIdCart);
            if (!dataCart) {
                return { ...NotificationOrder.ERROR_NOT_FOUND_USER, data : false };
            }
            return { ...NotificationOrder.GET_DATA_SUCCESS, data : dataCart };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getItemFromUsersCurrentCart
     * @description this is function get item from user current cart
     * @param reqData
     * @returns {Promise<void>}
     */
    async getItemFromUsersCurrentCart(reqData) {
        try {
            let userId = reqData.user_id;
            let productId = reqData.product_id;
            // get cart product remove from cart
            let dataProduct = await this.orderRepo.getItemFromUsersCurrentCart(userId, productId);
            if (!dataProduct) {
                return { ...NotificationOrder.NO_ITEM_IN_CART, data : false };
            }

            // handle cart current pay load
            const cartPayLoad = {
                id : dataProduct.id,
                quantity : dataProduct.quantity - reqData.quantity > 0 ? dataProduct.quantity - reqData.quantity : 0,
                sub_total: dataProduct.sub_total - reqData.sub_total > 0 ? dataProduct.sub_total - reqData.sub_total : 0
            }

            if (cartPayLoad.quantity > 0) {
                // update quantity and sub_total in cart
                let resUpdateCart = await this.orderRepo.updateCart(cartPayLoad.id, cartPayLoad);
                if (resUpdateCart) {
                    let updateDetailOrder = await this.updateDetailOrder(dataProduct, reqData);
                    if (updateDetailOrder) {
                        return { ...NotificationOrder.REMOVE_CART_UPDATE_SUCCESS, data : true };
                    }
                }
            } else {
                // delete cart
                let resDeleteCart = await this.orderRepo.deleteFromCart(cartPayLoad.id);
                if (resDeleteCart) {
                    let deleteCartOrder = await this.updateDetailOrder(dataProduct, reqData);
                    if (deleteCartOrder) {
                        return { ...NotificationOrder.DELETE_CART_SUCCRESS, data : true };
                    }
                }
            }
        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function updateDetailOrder
     * @description this is function update value in table order when remove product in cart
     * @param dataProduct
     * @param reqData
     * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
     */
    async updateDetailOrder (dataProduct, reqData) {
        // get data by order_id from table order
        let orderId = dataProduct.order_id;
        let orderData = await this.orderRepo.getOrderById(orderId);
        const orderPayLoad = {
            id : orderData.id,
            quantity : orderData.quantity - reqData.quantity > 0 ? orderData.quantity - reqData.quantity : 0,
            sub_total: orderData.sub_total - reqData.sub_total > 0 ? orderData.sub_total - reqData.sub_total : 0
        }
        // update quantity, sub_total in table orders
        return await this.orderRepo.updateOrder(orderPayLoad.id, orderPayLoad);
    }

    /**
     * @function createShipment
     * @description this is function create data shipment
     * @param reqData
     * @returns {Promise<void>}
     */
    async createShipment(reqData) {
        try {
            let dataShipment = await this.orderRepo.createShipment(reqData);
            if (!dataShipment) {
                return { ...NotificationOrder.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationOrder.CREATE_SUCCESS, data : dataShipment };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getUserShipment
     * @description this is get user shipment by id
     * @param reqData
     * @returns {Promise<{message: string, status: number}>}
     */
    async getUserShipment(shipmentId) {
        try {
            let dataShipment = await this.orderRepo.getUserShipment(shipmentId);
            if (dataShipment.length <= 0) {
                return { ...NotificationOrder.ERROR_NOT_FOUND_USER_SHIPMENT, data : false };
            }
            return { ...NotificationOrder.GET_DATA_SUCCESS, data : dataShipment };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function updateUserShipmet
     * @description this is function update data user shipment by id
     * @param reqData
     * @returns {Promise<void>}
     */
    async updateUserShipment(shipmentId, data) {
        try {
            const toBeUpdated = {};
            const canBeUpdated = ['tracking_id', 'status'];
            for (let i in data) {
                if (canBeUpdated.indexOf(i) > -1) {
                    toBeUpdated[i] = data[i];
                }
            }
            let dataShipment = await this.orderRepo.updateShipment(shipmentId, toBeUpdated);
            if (!dataShipment) {
                return { ...NotificationOrder.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationOrder.UPDATE_DATA_SUCCESS, data : dataShipment };

        } catch (e) {
            return { ...NotificationOrder.INTERNAL_SERVER_ERROR };
        }
    }

}

module.exports = new OrderService();