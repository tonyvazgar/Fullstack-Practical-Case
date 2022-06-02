const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = (ENGINE_DB === 'mongo') ? './mongo/' : './mysql/';

const models = {
    employeeMoodel: require(`${pathModels}employee`)
}

module.exports = models;