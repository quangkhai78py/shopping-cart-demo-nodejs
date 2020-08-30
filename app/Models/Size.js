const Model = require('./BaseModel');

class Size extends Model {
    static get tableName(){
        return 'size';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Size;