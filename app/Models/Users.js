const Model = require("./BaseModel");

class Users extends Model {
    static get tableName(){
        return 'users';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Users;