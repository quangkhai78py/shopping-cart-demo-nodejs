const UserRepository = require('../Repositories/UserRepository');
const { NotificationsUser } = require('../Helpers/Notifications');
const Bcrypt = require('bcrypt');
const Jwt = require('json-web-token');
const moment = require('moment');
require('dotenv').config();

class AuthService {
    constructor() {
        this.userRepo = UserRepository;
    }

    /**
     * @function login
     * @description this is function service handle login
     * @param data
     * @returns {Promise<{data: null}>}
     */
    async login (req, res) {
        try {
            let { email, password } = req.body;
            let user = await this.userRepo.findUserByEmail(email);
            if (!user || typeof user === 'undefined') {
                return { ...NotificationsUser.EMAIL_AND_PASSWORD_NOT_EXIST, data: false };
            }

            // compare password hash and check password have overlap
            let checkPassword = await this.compare({password, hash : user.password});
            if (checkPassword !== true) {
                return { ...NotificationsUser.EMAIL_AND_PASSWORD_NOT_EXIST, data: false };
            }

            // when login create and encode new token by id user, check token not exist
            let token = await this.encode({data : user.id});
            if (!token) {
                return { ...NotificationsUser.DATA_TOKEN_EMPTY, data: false };
            }
            await this.setCookie(res, token);
            return { ...NotificationsUser.LOGIN_SUCCESS, data: token };

        }catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function logout
     * @description this is function logout for user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async logout(req, res) {
        try {
            let refreshToken = req.header(process.env.KEY_TOKEN_HEADER);
            let removeCookie = await this.removeCookie(res, refreshToken);
            if (!removeCookie) {
                return { ...NotificationsUser.ERROR_DONT_DOING, data : false };
            }
            return { ...NotificationsUser.LOGOUT_SUCCESS };

        } catch (e) {
            return { ...NotificationsUser.INTERNAL_SERVER_ERROR };
        }
    }

    /**
     * @function compare
     * @description this is function compare password
     * @param password
     * @param hash
     * @returns {Promise<unknown>}
     */
    async compare ({password, hash}) {
        return new Promise (function(resolve, reject) {
            Bcrypt.compare(password, hash, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    /**
     * @function encode
     * @description this is function encode and created token
     * @param data
     * @returns {Promise<*>}
     */
    async encode ({data}) {
        const token = Jwt.encode(process.env.APP_KEY, {
            data: data,
            iat: moment().unix(), // thời điểm token được phát hành, tính theo UNIX time
        });
        return token.value;
    }

    /**
     * @function setCookie
     * @description this is function set cookie token
     * @param res
     * @param accessToken
     * @returns {Promise<void>}
     */
    async setCookie (res, accessToken) {
        res.cookie ('Authorization', accessToken, {
            httpOnly: true,// bảo về cookie khỏi việc truy cập trái phép từ browser. Chỉ lưu và gửi kèm cookie phản hồi từ client tới server
            maxAge: Number(process.env.EXPIRES_IN) * 7,
            secure: false, // note if secure = true ? https : http
            domain: process.env.DOMAIN,
            path: '/',
        });
        return true;
    }

    /**
     * @function removeCookie
     * @description this is function remove cookie
     * @param res
     * @param refreshToken
     * @returns {Promise<void>}
     */
    async removeCookie ( res, refreshToken ) {
        res.cookie ('Authorization', refreshToken, {
            httpOnly: true,
            maxAge: 0,
            secure: false,
            domain: process.env.DOMAIN,
            path: '/',
        });
        return true;
    }

}

module.exports = new AuthService();