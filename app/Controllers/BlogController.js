
const BlogService = require('../Services/BlogService');
const ApiRepository = require('../Repositories/ApiRepository');

class BlogController {
    constructor() {
        this.blogService = BlogService;
        this.apiRepo = ApiRepository;
    }

    /**
     * @function getBlogId
     * @description this is function get data blog by id
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getBlogById (req, res) {
        let dataBlog = await this.blogService.getBlogById(req.params.id);
        return await this.apiRepo.response(dataBlog, res);
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getBlogByCategoryId (req, res) {
        let dataBlog = await this.blogService.getBlogByCategoryId(req.params.id);
        return await this.apiRepo.response(dataBlog, res);
    }

    /**
     * @function getBlogAll
     * @description this is function get all data blog
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getBlogAll (req, res) {
        let dataBlog = await this.blogService.getBlogAll();
        return await this.apiRepo.response(dataBlog, res);
    }

    /**
     * @function createBlog
     * @description this is function create blog
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async createBlog (req, res) {
        let dataBlog = await this.blogService.createBlog(req.body);
        return await this.apiRepo.response(dataBlog, res)
    }

    /**
     * @function updateBlog
     * @description this is function update data blog by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async updateBlog (req, res) {
        let dataBlog = await this.blogService.updateBlog(req.params.id, req.body);
        return await this.apiRepo.response(dataBlog, res);
    }

    /**
     * @function deleteBlog
     * @description this is function delete data blog by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async deleteBlog (req, res) {
        let dataBlog = await this.blogService.deleteBlog(req.params.id);
        return await this.apiRepo.response(dataBlog, res);
    }
}

module.exports = new BlogController();