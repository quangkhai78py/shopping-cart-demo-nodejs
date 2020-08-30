const AuthService = require('../Services/AuthService');
const ApiRepository = require('../Repositories/ApiRepository');

class AuthController {
    constructor() {
        this.authService = AuthService;
        this.apiRepo = ApiRepository;
    }

    /**
     *@function login
     *@description this function login user
     *@param req
     *@param res
     *@returns {Promise<void>}
     */
    async login (req, res) {
        const dataUser = await this.authService.login(req, res);
        return this.apiRepo.response(dataUser, res);
    }

    /**
     * @function logout
     * @description this is function logout user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async logout(req, res) {
        const userLogout = await this.authService.logout(req, res);
        return this.apiRepo.response(userLogout, res);
    }
}

module.exports = new AuthController();