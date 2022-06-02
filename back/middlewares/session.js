const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJWT');
const { usersModel } = require('../models');
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_JWT", 401);
            return
        }
        const token = req.headers.authorization.split(' ').pop();
        const data_token = await verifyToken(token);

        if (!data_token) {
            handleHttpError(res, "NO_PAYLOAD_DATA", 401);
            return
        }

        const query = {
            [propertiesKey._id]: data_token[propertiesKey._id]
        }

        const user = await usersModel.findOne(query);
        req.user = user;

        next();
    } catch (error) {
        handleHttpError(res, "ERROR_SESSION", 401);
    }
}

module.exports = authMiddleware;