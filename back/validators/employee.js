const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegister = [
    check('name').exists().notEmpty(),
    check('lastname').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorRegister, validatorGetItem };