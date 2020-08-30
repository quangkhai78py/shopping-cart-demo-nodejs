
const allowAdmin = (req, res, next) => {
    const sss = req.session;
    if (!sss || !sss.user_role || !sss.user_role.length || !sss.user_role.indexOf('admin') < 0) {
        return res.status(401).send({
            'message' : 'user not have permission this is function'
        });
    }
    next();
}

const allowCustomer = (req, res, next) => {
    const sss = req.session;
    if (!sss || !sss.user_role || !sss.user_role.length || !sss.user_role.indexOf('customer') < 0) {
        return res.status(401).send({
           'message' : 'user not have permission this is function'
        });
    }
    next();
}

module.exports = { allowAdmin, allowCustomer };