
const Model = require('./BaseModel');

class Cart extends Model {
    static get tableName(){
        return 'cart';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Cart;