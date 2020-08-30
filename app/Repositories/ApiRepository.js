/**
 * NOTE: base ApiRepository this is class handle and response data, status, message api
 */
class ApiRepository {

    /**
     * @function response
     * @description this is function get data
     * @param option
     * @param res
     */
    response (option, res) {
        let {data, status, message} = option;
        this.statusResponse(status, data, message, res);
    }

    /**
     * @function statusResponse
     * @description handle cases status api and response result
     * @param status
     * @param data
     * @param message
     * @param res
     * @returns {*}
     */
    statusResponse (status = 0, data, message, res) {
        return res.send(this.status(data, status, message))
    }

    /**
     * @function status
     * @description this is function format data
     * @param data
     * @param status
     * @param message
     * @returns {{notification: {data: *, message: *, status: *}}}
     */
    status(data, status, message) {
        return {
            notification : {
                status : status,
                message : message,
                data: data
            }
        }
    }
}

module.exports = new ApiRepository();