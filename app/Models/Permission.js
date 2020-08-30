
const Model = require('./BaseModel');

class Permission extends Model {
    static get tableName(){
        return 'user_permission';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Permission;