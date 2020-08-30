
const Model = require('./BaseModel');

class Order extends Model {
    static get tableName(){
        return 'orders';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Order;