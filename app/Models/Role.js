
const Model = require('./BaseModel');

class Role extends Model {
    static get tableName(){
        return 'user_role';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Role;