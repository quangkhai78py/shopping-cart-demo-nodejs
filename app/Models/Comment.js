const Model = require('./BaseModel');

class Comment extends Model {
    static get tableName(){
        return 'comment';
    }

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }
}

module.exports = Comment;