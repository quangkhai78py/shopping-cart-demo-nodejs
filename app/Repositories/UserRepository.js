const BaseRepository = require('./BaseRepository');
const Users = require('../Models/Users');
const Permission = require('../Models/Permission');
const Role = require('../Models/Role');

/**
 * Note: class UserRepository kế thừa BaseRepository
 */

class UserRepository extends BaseRepository {
    /**
     * Note: Truyền params model muốn kết nối và tương tác.
     */
    constructor() {
        super(Users);
        this.users = Users;
        this.permission = Permission;
        this.role = Role;
    }

    /**
     * @function getUserUnique
     * @description this is function get email user unique
     * @param email
     * @returns {Objection.QueryBuilder<this, this[]>}
     */
    async findUserByEmail(email) {
        return await  this.users.query().where('email', email).first();
    }

    /**
     * @function createUserPermission
     * @description this is function create user permission
     * @param dataUserPermission
     * @returns {Promise<void>}
     */
    async createUserPermission(dataUserPermission) {
        return await this.permission.query().insert(dataUserPermission);
    }

    /**
     * @function creareUserRole
     * @description this is function create user role
     * @param dataUserRole
     * @returns {Promise<void>}
     */
    async createUserRole(dataUserRole) {
        return await this.role.query().insert(dataUserRole);
    }
}

module.exports = new UserRepository();

