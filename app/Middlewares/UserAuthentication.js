const UserRepository = require('../Repositories/UserRepository');
const { NotificationsUser } = require('../Helpers/Notifications');
const Jwt = require('json-web-token');
const moment = require('moment');
require('dotenv').config();

class UserAuthentication {
    constructor() {
        this.userRepo = UserRepository;
    }

    /**
     * @function authentication
     * @description this is function handle logic and authentication user by token
     * @param req
     * @param res
     * @param next
     * @returns {Promise<{data: null}>}
     */
    async authentication (req, res, next) {
        try {
            // get and check token
            let token = req.header(process.env.KEY_TOKEN_HEADER);

            if (!token) {
                return res.send({ ...NotificationsUser.DATA_TOKEN_EMPTY, data: false });
            }

            // decode and check expired token true or false
            let tokenUser = await this.decode({ token });
            if (tokenUser.expired === true) {
                return res.send({ ...NotificationsUser.TOKEN_EXPIRED, data: false });
            }

            // get data user by id = tokenUser.data and check user have not exist
            let dataUser = await this.userRepo.findOneById({ id : tokenUser.data });
            if (!dataUser) {
                return res.send({ ...NotificationsUser.ERROR_NOT_LOGIN, data: false  });
            }

            //set value data user for req = id user login
            req.user = dataUser;

            // all ok next
            return next();

        } catch (e){
            return res.send({ ...NotificationsUser.INTERNAL_SERVER_ERROR, data: false });
        }
    }

    /**
     * @function decode
     * @description this is function decode token user
     * @param token
     * @returns {Promise<{expired: boolean, data: *}|{expired: boolean}>}
     */
    async decode ({ token }) {
        // decode jwt from header
        const tokenUser = Jwt.decode(process.env.APP_KEY, token);
        // set timestamp from library moment
        let timestamp = moment().unix();
        // check time to exist
        let timeToken = parseInt(tokenUser.value.iat + process.env.TIME_TOKEN);
        if(timeToken >= timestamp) {
            return {
                data: tokenUser.value.data,
                expired: false
            }
        }
        return { expired: true }
    }

}

module.exports = new UserAuthentication();