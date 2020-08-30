
const BaseRepository = require('./BaseRepository');
const Blog = require('../Models/Blog');

class BlogRepository extends BaseRepository {
    constructor() {
        super(Blog);
        this.blog = Blog;
    }

    /**
     * @function getBlogByCategoryId
     * @description this is function get data blog by category id
     * @param id
     * @returns {Promise<void>}
     */
    async getBlogByCategoryId (categoryId) {
        return await this.blog.query().where('category_id', categoryId);
    }
}

module.exports = new BlogRepository();