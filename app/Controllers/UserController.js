
const UserService = require('../Services/UserService');
const ApiRepository = require('../Repositories/ApiRepository');

class UserController {
    constructor() {
        this.userService = UserService;
        this.apiRepo = ApiRepository;
    }

    /**
     * @function getUser
     * @description this is function get user by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getUser (req, res) {
        let dataUser = await this.userService.getProfile(req.user);
        return this.apiRepo.response(dataUser, res);
    }

    /**
     * @function createUser
     * @description this is function create user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async createUser (req, res) {
        let dataUser = await this.userService.createUser(req.body);
        return this.apiRepo.response(dataUser, res);
    }

    /**
     * @function updateUser
     * @description this is function update user by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async updateUser (req, res) {
        let dataUser = await this.userService.updateUser(req.user.id, req.body);
        return this.apiRepo.response(dataUser, res);
    }

    /**
     * @function getUserAll
     * @description this is function get all data user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getAllUser(req, res) {
        let dataUser = await this.userService.getAllUser();
        return this.apiRepo.response(dataUser, res);
    }

    /**
     * @function deleteUser
     * @description this is function delete data user by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async deleteUser(req, res) {
        let dataUser = await this.userService.deleteUser(req.user.id);
        return this.apiRepo.response(dataUser, res);
    }

    /**
     * @function createUserPermission
     * @description this is function create user permission
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async createUserPermission(req, res) {
        let dataUserPermission = await this.userService.createUserPermission(req.body);
        return this.apiRepo.response(dataUserPermission, res);
    }

    /**
     * @function createUserRole
     * @description this is function creare user role
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async createUserRole (req, res) {
        let dataUserRole = await this.userService.createUserRole(req.body);
        return this.apiRepo.response(dataUserRole, res);
    }
}

module.exports = new UserController();
