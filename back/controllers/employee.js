const { matchedData } = require('express-validator');
const { employeeMoodel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { encrypt, compare } = require("../utils/handlePassword");
const { signToken, verifyToken } = require("../utils/handleJWT");

/**
 * Ejecucion de Register
 */
const register = async (req, res) => {
    try {
        req = matchedData(req);
        const employee_name = req.name;
        const employee_lastname = req.lastname;
        const id = aleatorio(10);
        const body = { ...req, id }
        const dataUser = await employeeMoodel.create(body);

        const data = dataUser;
        res.status(201)
        res.send(data);
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_REGISTER")
    }
};


/**
 * Listado de employees
 */
const listadoEmployees = async (req, res) => {
    try {
        const data = await employeeMoodel.find({});     //Mongo
        res.send(data);
    } catch (error) {
        console.log(error);
        handleHttpError(res, "ERROR_GET_EMPLOYEES_LIST");
    }
};

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        console.log("****ELIMINANDO****" + req);
        const { id } = req;
        const deleteResponse = await employeeMoodel.delete({ id });
        const data = {
            deleted: deleteResponse.matchedCount
        }
        res.send(data);
    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_Delete_ITEM");
    }
};

const editItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        console.log("Editando ***" + req);
        console.log(body);
        console.log(id);
        const data = await employeeMoodel.findOneAndUpdate(
            {id}, body, {new: true}
        );
        res.send(data)
    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_Edit_ITEM");
    }
};

function aleatorio(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports = { register, listadoEmployees, deleteItem, editItem }