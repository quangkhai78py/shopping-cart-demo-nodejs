
const ProductService = require('../Services/ProductService');
const ApiRepository = require('../Repositories/ApiRepository');

class ProductController {
    constructor() {
        this.productService = ProductService;
        this.apiRepo = ApiRepository;
    }

    /**
     * @function getProduct
     * @description this is function get product by id
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getProduct (req, res) {
        let product = await this.productService.getProduct(req.params.id);
        return await this.apiRepo.response(product, res);
    }

    /**
     * @function getProductCategoryId
     * @description this is function get product by category id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getProductbyCategoryId (req, res) {
        let products = await this.productService.getProductByCategoryId(req.params.id);
        return await this.apiRepo.response(products, res);
    }

    /**
     * @function getProductByCategoryId
     * @description this is function get data product by size id
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getProductByCategoryId(req, res) {
        let products = await this.productService.getProductBySizeId(req.params.id);
        return await this.apiRepo.response(products, res);
    }

    /**
     * @function getProductAll
     * @description this is function get all data product
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getProductAll (req, res) {
        let products = await this.productService.getProductAll();
        return await this.apiRepo.response(products, res);
    }

    /**
     * @function createProduct
     * @description this is function create data product
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async createProduct (req, res) {
        let product = await this.productService.createProduct(req.body);
        return await this.apiRepo.response(product, res);
    }

    /**
     * @function updateProduct
     * @description this is function update data product by id
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async updateProduct (req, res) {
        let product = await this.productService.updateProduct(req.params.id, req.body);
        return await this.apiRepo.response(product, res);
    }

    /**
     * @function deleteProduct
     * @description this is function delete product by id
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async deleteProduct(req, res) {
        let product = await this.productService.deleteProduct(req.params.id);
        return await this.apiRepo.response(product, res);
    }

    /**
     * @function createProductCategory
     * @description this is function create category
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async createProductCategory(req, res) {
        let productCategory = await this.productService.createProductCategory(req.body);
    }

}

module.exports = new ProductController();