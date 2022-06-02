const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("./handlePropertiesEngine");
const propertiesKey = getProperties();

/**
 * Obtener el token de sesion
 * @param {*} user 
 * @returns 
 */
const signToken = async (user) => {
    const sign = jwt.sign(
        {
            [propertiesKey.id]: user[propertiesKey.id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sign;
};

/**
 * Verificar el token de sesion
 * @param {*} tokenJtw 
 * @returns 
 */
const verifyToken = async (tokenJtw) => {
    try {
        return jwt.verify(tokenJtw, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { signToken, verifyToken };