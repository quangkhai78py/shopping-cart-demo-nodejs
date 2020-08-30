
const UserRepository = require('../Repositories/UserRepository')
const { NotificationsUser } = require('../Helpers/Notifications');
const Bcrypt = require("bcrypt");
require('dotenv').config();

class UserService {
    constructor() {
        this.userRepo = UserRepository;
    }

    /**
     * @function getProfile
     * @description this is function get data info user by id
     * @param id
     * @returns {Promise<void>}
     */
    async getProfile (user) {
        try {
            if (!user) {
                return { ...NotificationsUser.ERROR_NOT_FOUND, data : false };
            }
            return { ...NotificationsUser.GET_DATA_SUCCESS, data : user };

        }catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function createUser
     * @description this is function create data user
     * @param data
     * @returns {Promise<void>}
     */
    async createUser (data) {
        try {
            let { email, password } = data;

            let userUnique = await this.userRepo.findUserByEmail(email);
            if (userUnique) {
                return { ...NotificationsUser.DATA_EMAIL_UNIQUE, data: false };
            }

            data.password = await this.hash({ password : password });
            if (data.password) {
                let user = await this.userRepo.created({ data });
                if (!user) {
                    return { ...NotificationsUser.ERROR_DONT_DOING, data: false };
                }
                return { ...NotificationsUser.CREATE_SUCCESS, data: user };
            }

        } catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function updateUser
     * @description this is function update data user by id
     * @param id
     * @param data
     * @returns {Promise<void>}
     */
    async updateUser (userId, data) {
        try {
            let { password } = data;

            data.password = await this.hash({ password : password });

            if (data.password) {
                let user = await this.userRepo.updatedOne({ userId, data });
                if (!user) {
                    return { ...NotificationsUser.ERROR_DONT_DOING, data: false};
                }
                return { ...NotificationsUser.UPDATE_DATA_SUCCESS, data: user};
            }

            return { ...NotificationsUser.ERROR_HASH_PASSWORD }

        }catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR}
        }
    }

    /**
     * @function getAllUser
     * @description this is function get all data user
     * @returns {Promise<void>}
     */
    async getAllUser () {
        try {
            let users = await this.userRepo.findAll();
            if (!users) {
                return { ...NotificationsUser.ERROR_GET_DATA, data : false };
            }
            return { ...NotificationsUser.GET_DATA_SUCCESS, data : users };

        } catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @functionUser
     * @description this is function delete data user by id
     * @param id
     * @returns {Promise<void>}
     */
    async deleteUser(id) {
        try {
            let user = await this.userRepo.deleteOneById({ id })
            if (!user) {
                return { ...NotificationsUser.DELETE_DATA_NOT_EMPTY, data: false };
            }
            return { ...NotificationsUser.DELETE_DATA_SUCCESS, data : true };
        }catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function createUserPermission
     * @description this is funtion create permission user
     * @param dataUserPermission
     * @returns {Promise<void>}
     */
    async createUserPermission(dataUserPermission) {
        try {
            let userPermisstion = await this.userRepo.createUserPermission(dataUserPermission);
            if (!userPermisstion) {
                return { ...NotificationsUser.ERROR_DONT_DOING };
            }
            return { ...NotificationsUser.CREATE_SUCCESS_PERMISSION, data : userPermisstion };

        } catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function createUserRole
     * @description this is function create data user role
     * @param dataUserRole
     * @returns {Promise<void>}
     */
    async createUserRole(dataUserRole) {
        try {
            let role = await this.userRepo.createUserRole(dataUserRole);
            if (!role) {
                return { ...NotificationsUser.ERROR_DONT_DOING };
            }
            return { ...NotificationsUser.CREATE_SUCCESS_ROLE };

        } catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function hash
     * @description this is function hash and salt password user
     * @param password
     * @returns {Promise<unknown>}
     */
    async hash ({ password }) {
        return new Promise (function(resolve, reject) {
            const salt = 10;
            Bcrypt.hash(password, salt, function(err, hash) {
                if(err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    }

}

module.exports = new UserService ();