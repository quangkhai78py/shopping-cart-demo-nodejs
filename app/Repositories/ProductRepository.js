
const BaseRepository = require('./BaseRepository');
const Product = require('../Models/Product');
const Category = require('../Models/Category');

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
        this.product = Product;
        this.category = Category;
    }

    /**
     * @function getProductByCategoryId
     * @description this is function get data product by category id
     * @param categoryId
     * @returns {Promise<void>}
     */
    async getProductByCategoryId ({ categoryId }) {
        return await this.product.query().where('category_id', categoryId);
    }

    /**
     * @function createProductCategory
     * @description this is function create product category
     * @param dataProductCategory
     * @returns {Objection.QueryBuilder<this, this[]>}
     */
    async createProductCategory(dataProductCategory) {
        return await this.category.query().insert(dataProductCategory);
    }

    /**
     * @function getProductBySizeId
     * @description this is function get data product by size id
     * @param sizeId
     * @returns {Promise<Objection.QueryBuilder<this, this[]>[]>}
     */
    async getProductBySizeId ({ sizeId }) {
        return await this.product.query().where('size_id', sizeId);
    }
}

module.exports = new ProductRepository();