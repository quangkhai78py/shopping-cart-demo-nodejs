const Model = require('./BaseModel');

class Product extends Model {
    static get tableName(){
        return 'product';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Product;