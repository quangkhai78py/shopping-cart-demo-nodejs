/**
 * @NOTE: notifications for user this is file config status, message api.
 * @type {{GET_DATA_SUCCESS: {message: string, status: number},
 * ERROR_DATA_NULL: {message: string, status: number}}}
 */
const NotificationsUser = {
    GET_DATA_SUCCESS : {
        status : 200,
        message : 'Get data user success'
    },
    UPDATE_DATA_SUCCESS : {
        status : 200,
        message : 'Update data user success'
    },
    LOGIN_SUCCESS : {
        status : 200,
        message : 'Login success'
    },
    DELETE_DATA_SUCCESS : {
        status : 200,
        message : 'Delete data user success'
    },
    ERROR_NOT_FOUND : {
        status: 404,
        message: 'Not found data user by id'
    },
    ERROR_NOT_LOGIN : {
        status: 404,
        message: 'Not found data user and not yet login or token wrong'
    },
    INTERNAL_SERVER_ERROR : {
        status: 500,
        message : 'Internet server error'
    },
    CREATE_SUCCESS : {
        status : 201,
        message : 'Create data user success'
    },
    CREATE_SUCCESS_PERMISSION : {
        status : 201,
        message : 'Create data user permission success'
    },
    CREATE_SUCCESS_ROLE : {
        status : 201,
        message : 'Create data user role success'
    },
    DATA_TOKEN_EMPTY : {
        status : 401,
        message : 'Token not empty or not exist token'
    },
    DATA_EMAIL_UNIQUE : {
        status : 400,
        message : 'Mails cannot overlap',
        unique : 1
    },
    DELETE_DATA_NOT_EMPTY : {
        status : 400,
        message : 'User does not exist in database',
    },
    ERROR_DONT_DOING : {
        status : 400,
        message : 'Not possible'
    },
    LOGOUT_SUCCESS : {
        status : 200,
        message : 'Logout user success'
    },
    EMAIL_AND_PASSWORD_NOT_EXIST : {
        status : 400,
        message : 'Email and Password wrong'
    },
    TOKEN_EXPIRED : {
        status : 400,
        message : 'Token expired'
    },
    ERROR_HASH_PASSWORD : {
        status : 401,
        message : 'Hash and salt password error'
    },
    ERROR_GET_DATA : {
        status : 404,
        message : 'Get data fail data not found'
    },

}

/**
 * @NOTE : Notifications for blog this is file config status, message api.
 * @type {{INTERNAL_SERVER_ERROR: {message: string, status: number},
 * ERROR_NOT_FOUND: {message: string, status: number},
 * GET_DATA_SUCCESS: {message: string, status: number}}}
 */
const NotificationsBlog = {
    GET_DATA_SUCCESS : {
        status : 200,
        message : 'Get data user success'
    },
    INTERNAL_SERVER_ERROR : {
        status: 500,
        message : 'Internet server error'
    },
    ERROR_NOT_FOUND : {
        status: 404,
        message: 'Not found data blog by id'
    },
    ERROR_GET_DATA : {
        status : 404,
        message : 'Get data fail data not found'
    },
    ERROR_DONT_DOING : {
        status : 400,
        message : 'Not possible'
    },
    UPDATE_DATA_SUCCESS : {
        status : 200,
        message : 'Update data user success'
    },
    CREATE_SUCCESS : {
        status : 201,
        message : 'Create data user success'
    },
    DELETE_DATA_SUCCESS : {
        status : 200,
        message : 'Delete data blog success'
    },
}

const NotificationProducts = {
    INTERNAL_SERVER_ERROR : {
        status: 500,
        message : 'Internet server error'
    },
    GET_DATA_SUCCESS : {
        status : 200,
        message : 'Get data user success'
    },
    ERROR_NOT_FOUND : {
        status: 404,
        message: 'Not found data product by id'
    },
    ERROR_GET_DATA : {
        status : 404,
        message : 'Get data fail data not found'
    },
    ERROR_DONT_DOING : {
        status : 400,
        message : 'Not possible'
    },
    CREATE_SUCCESS : {
        status : 201,
        message : 'Create data product success'
    },
    CREATE_SUCCESS_CATEGORY : {
        status : 201,
        message : 'Create data product category success'
    },
    UPDATE_DATA_SUCCESS : {
        status : 200,
        message : 'Update data product success'
    },
    DELETE_DATA_SUCCESS : {
        status : 200,
        message : 'Delete data product success'
    },
}

const NotificationOrder = {
    INTERNAL_SERVER_ERROR : {
        status: 500,
        message : 'Internet server error'
    },
    CREATE_SUCCESS : {
        status : 201,
        message : 'Create data order success'
    },
    ERROR_DONT_DOING : {
        status : 400,
        message : 'Not possible'
    },
    ERROR_NOT_FOUND_USER : {
        status: 404,
        message: 'Not found user by id'
    },
    ERROR_NOT_FOUND_USER_SHIPMENT : {
        status: 404,
        message: 'Not found user shipment by id'
    },
    ERROR_NOT_FOUND : {
        status: 404,
        message: 'Not found data order by id'
    },
    ERROR_NOT_FOUND_CART : {
        status: 404,
        message: 'Not found data cart by order id'
    },
    GET_DATA_SUCCESS : {
        status : 200,
        message : 'Get data order success'
    },
    NO_ITEM_IN_CART : {
      status : 520,
      message : 'no item in cart'
    },
    UPDATE_DATA_SUCCESS : {
        status : 200,
        message : 'Update data order success'
    },
    DELETE_CART_SUCCRESS : {
        status : 200,
        message : 'Delete cart success'
    },
    REMOVE_CART_UPDATE_SUCCESS : {
        status : 200,
        message : 'Remove cart and update success order'
    },
    UPDATE_ADD_TO_CART : {
        status : 200,
        message : 'Update add to cart success'
    },
    ADD_NEW_CART : {
        status : 201,
        message : 'Add new cart success'
    }
}

module.exports = {
    NotificationsUser,
    NotificationsBlog,
    NotificationProducts,
    NotificationOrder
};