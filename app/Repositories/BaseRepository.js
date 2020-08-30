class BaseRepository {
    constructor(Model) {
        this.model = Model;
    }

    /**
     * note async: function asynchronous
     * note await: suspends the async function.
     */

    /**
     * @function create
     * @description this is function asynchronous created data
     * @param data
     * @returns {Promise<void>}
     */
    async created ({ data }) {
        return await this.model.query().insert(data);
    }

    /**
     * @function findOneById
     * @description this is function asynchronous find data by id
     * @param id
     * @returns {Promise<void>}
     */
    async findOneById ({ id }) {
        return  await  this.model.query().where('id', id).first();
    }

    /**
     * @function findAll
     * @description this is function asynchronous find all data
     * @param page
     * @param limit
     * @param column
     * @returns {Promise<void>}
     */
    async findAll () {
        return await this.model.query();
    }

    /**
     * @function updated
     * @description this is function asynchronous update data by id
     * @param id
     * @returns {Promise<void>}
     */
    async updatedOne ({ id, data }) {
        return await this.model.query().where('id', id).update(data);
    }

    /**
     * @function deleteOneById
     * @description this is function asynchronous delete data by id
     * @param id
     * @returns {Promise<void>}
     */
    async deleteOneById ({ id }) {
        return await this.model.query().where('id', id).delete();
    }
}

module.exports = BaseRepository;