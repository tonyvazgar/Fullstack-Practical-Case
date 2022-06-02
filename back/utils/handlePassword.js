const bcrypt = require("bcryptjs");

/**
 * Encriptar una contraseña en texto plano
 * @param {*} plainPassword 
 * @returns hash
 */
const encrypt = async (plainPassword) => {
    const hash = await bcrypt.hash(plainPassword, 10);
    return hash
};

/**
 * Pasar contraseña plana y encriptada para ver si son las mismas 
 * @param {*} plainPassword 
 * @param {*} hashPassword 
 * @returns 
 */
const compare = async (plainPassword, hashPassword) => {
    return await bcrypt.compare(plainPassword, hashPassword);
};

module.exports = { encrypt, compare };