const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJWT');
const { usersModel } = require('../models');

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role

        console.log({rolesByUser, roles});

        const checkValuesRole = roles.some((rol) => rolesByUser.includes(rol));

        if(!checkValuesRole){
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
            return;
        }
        next();
    } catch (error) {
        handleHttpError(res, "Error 403 - Forbidden", 403);
    }
}

module.exports = checkRol