const Model = require('./BaseModel');

class Shipment extends Model {
    static get tableName(){
        return 'shipment';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Shipment;