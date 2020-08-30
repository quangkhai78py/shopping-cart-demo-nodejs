
const Model = require('./BaseModel');

class Blog extends Model {
    static get tableName(){
        return 'blog';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Blog;