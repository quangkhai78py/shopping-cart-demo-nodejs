const Model = require('./BaseModel');

class Category extends Model {
    static get tableName(){
        return 'product_category';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}
module.exports = Category