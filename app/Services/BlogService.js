
const BlogRepository = require('../Repositories/BlogRepository');
const { NotificationsBlog } = require('../Helpers/Notifications');

class BlogService{
    constructor() {
        this.blogRepo = BlogRepository;
    }

    /**
     * @function getBlogById
     * @description this fucntion service handle logic and get data by id
     * @param id
     * @returns {Promise<{message: string, status: number}|
     * {data: boolean, message: string, status: number}|
     * {data: void, message: string, status: number}>}
     */
    async getBlogById (blogId) {
        try {
            let blog = await this.blogRepo.findOneById({ blogId });
            if (!blog) {
                return { ...NotificationsBlog.ERROR_NOT_FOUND, data : false };
            }
            return { ...NotificationsBlog.GET_DATA_SUCCESS, data : blog };

        } catch (e) {
            return { ...NotificationsBlog.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getBlogByCategoryId
     * @description this is function get data blog by category id
     * @param categoryId
     * @returns {Promise<{message: string, status: number}>}
     */
    async getBlogByCategoryId (categoryId) {
        try {
            let blogs = await this.blogRepo.getBlogByCategoryId(categoryId);
            if (!blogs) {
                return { ...NotificationsBlog.ERROR_GET_DATA, data : false };
            }
            return { ...NotificationsBlog.GET_DATA_SUCCESS, data : blogs };

        } catch (e) {
            return { ...NotificationsBlog.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function getBlogAll
     * @description this is function get all data blog
     * @returns {Promise<{message: string, status: number}>}
     */
    async getBlogAll () {
        try {
            let blogs = await this.blogRepo.findAll();
            if (!blogs) {
                return { ...NotificationsBlog.ERROR_GET_DATA, data : false };
            }
            return { ...NotificationsBlog.GET_DATA_SUCCESS, data : blogs };

        } catch (e) {
            return { ...NotificationsBlog.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function createBlog
     * @description this is function create data blog
     * @param data
     * @returns {Promise<{data: boolean}|{message: string, status: number}|
     * {data: void, message: string, status: number}>}
     */
    async createBlog (data) {
        try {
            let blog = await this.blogRepo.created({ data });
            if (!blog) {
                return { ...NotificationsBlog.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationsBlog.CREATE_SUCCESS, data : blog };

        } catch (e) {
            return { ...NotificationsBlog.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function updateBlog
     * @description this function update data blog by id
     * @param id
     * @param data
     * @returns {Promise<{message: string, status: number}|
     * {data: void, message: string, status: number}>}
     */
    async updateBlog (blogId, data) {
        try {
            let blog = await this.blogRepo.updatedOne({ blogId, data });
            if (!blog) {
                return { ...NotificationsBlog.ERROR_DONT_DOING, data : false };
            }
            return  { ...NotificationsBlog.UPDATE_DATA_SUCCESS, data : true };

        } catch (e) {
            return { ...NotificationsBlog.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function deleteBlog
     * @description this is function delete data blog by id
     * @param id
     * @returns {Promise<void>}
     */
    async deleteBlog (blogId) {
        try {
            let blog = await this.blogRepo.deleteOneById({ blogId });
            if (!blog) {
                return { ...NotificationsBlog.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationsBlog.DELETE_DATA_SUCCESS, data : true };

        } catch (e) {
            return { ...NotificationsBlog.INTERNAL_SERVER_ERROR };
        }
    }

}

module.exports = new BlogService();