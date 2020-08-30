
const ProductRepository = require('../Repositories/ProductRepository');
const { NotificationProducts } = require('../Helpers/Notifications');

class ProductService {
    constructor() {
        this.productRepo = ProductRepository;
    }

    /**
     * @function getProduct
     * @description this is function get product by id
     * @param id
     * @returns {Promise<void>}
     */
    async getProduct(productId) {
        try {
            let product = await this.productRepo.findOneById({ productId })
            if (!product) {
                return { ...NotificationProducts.ERROR_NOT_FOUND, data : false };
            }
            return { ...NotificationProducts.GET_DATA_SUCCESS, data : product };

        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getProductByCategoryId
     * @description this is function get data product by category id
     * @param categoryId
     * @returns {Promise<{message: string, status: number}>}
     */
    async getProductByCategoryId(categoryId) {
        try {
            let products = await this.productRepo.getProductByCategoryId({categoryId});
            if (!products) {
                return { ...NotificationProducts.ERROR_GET_DATA, data : false };
            }
            return { ...NotificationProducts.GET_DATA_SUCCESS, data : products };

        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getProductBySizeId
     * @description this is function get data product by size id
     * @param sizeId
     * @returns {Promise<{data: boolean, message: string, status: number}|
     * {message: string, status: number}|
     * {data: Objection.QueryBuilder<this, this[]>[], message: string, status: number}>}
     */
    async getProductBySizeId(sizeId) {
        try {
            let products = await this.productRepo.getProductBySizeId({ sizeId })
            if (!products) {
                return { ...NotificationProducts.ERROR_GET_DATA, data : false };
            }
            return { ...NotificationProducts.GET_DATA_SUCCESS, data : products };

        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getProductAll
     * @description this is function get all data product
     * @returns {Promise<void>}
     */
    async getProductAll() {
        try {
            let products = await this.productRepo.findAll();
            if (!products) {
                return { ...NotificationProducts.ERROR_GET_DATA, data : false };
            }
            return { ...NotificationProducts.GET_DATA_SUCCESS, data : products };

        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function createProduct
     * @description this is function create new data product
     * @param data
     * @returns {Promise<{message: string, status: number}>}
     */
    async createProduct(data) {
        try{
            let product = await this.productRepo.created({ data });
            if (!product) {
                return { ...NotificationProducts.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationProducts.CREATE_SUCCESS, data : product };

        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function updateProduct
     * @description this is function update data product by id
     * @param data
     * @param id
     * @returns {Promise<{message: string, status: number}>}
     */
    async updateProduct(productId, data) {
        try {
            let product = await this.productRepo.updatedOne({ productId, data });
            if (!product) {
                return { ...NotificationProducts.ERROR_NOT_FOUND, data : false };
            }
            return { ...NotificationProducts.UPDATE_DATA_SUCCESS, data : product };

        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function deleteProduct
     * @description this is function delete product by id
     * @param id
     * @returns {Promise<void>}
     */
    async deleteProduct(productId) {
        try {
            let product = await this.productRepo.deleteOneById({ productId });
            if (!product) {
                return { ...NotificationProducts.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationProducts.DELETE_DATA_SUCCESS, data : product };
        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function createProductCategory
     * @description this is function create product category
     * @param dataProductCategory
     * @returns {Promise<void>}
     */
    async createProductCategory(dataProductCategory) {
        try {
            let productCategory = await this.productRepo.createProductCategory(dataProductCategory);
            if (!productCategory) {
                return { ...NotificationProducts.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationProducts.CREATE_SUCCESS_CATEGORY, data : productCategory };

        } catch (e) {
            return { ...NotificationProducts.INTERNAL_SERVER_ERROR };
        }
    }

}

module.exports = new ProductService();