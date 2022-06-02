const express = require("express");
const router = express.Router();
const { validatorRegister, validatorGetItem } = require('../validators/employee');
const { login, register, listadoEmployees, deleteItem, editItem } = require("../controllers/employee");
const checkRol = require('../middlewares/rol');
const employeeMiddleware = require("../middlewares/session");


/**
 * Post Register
 * @openapi
 * /employee/register:
 *      post:
 *          summary: "Register a user."
 *          description: "This route is to register a new user."
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/employeeRegister"
 *                          properties:
 *                              name:
 *                                  type: string
 *                              lastname:
 *                                  type: string
 *          tags:
 *              - employee
 *          responses:
 *              '201':
 *                  description: "User was registed successful."
 *              '403': 
 *                  description: "An error ocurred :("
 */
router.post("/register", validatorRegister, register);


/**
 * Get List Users
 */
/**
 * Post Register
 * @openapi
 * /employee/list:
 *      get:
 *          summary: "Return a list of all employee."
 *          description: "Return a list of all employee."
 *          tags:
 *              - employee
 *          responses:
 *              '201':
 *                  description: "Return a list of all employee."
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              '422':
 *                  description: "Validation error"
 */
router.get('/list', listadoEmployees);


/**
 * Edit user info
 * @openapi
 * /employee/edit/{id}:
 *    put:
 *      tags:
 *        - employee
 *      summary: "Eliminar un employee"
 *      description: Elimiar un employee
 *      requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/employeeRegister"
 *               properties:
 *                 name:
 *                   type: string
 *                 lastname:
 *                   type: string
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de employee a eliminar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Eliminado
 *        '422':
 *          description: Error de validacion.
 */
router.put("/edit/:id", validatorGetItem, validatorRegister, editItem);


/**
 * Eliminar user
 * @openapi
 * /employee/delete/{id}:
 *    delete:
 *      tags:
 *        - employee
 *      summary: "Eliminar un employee"
 *      description: Elimiar un employee
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID de employee a eliminar
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Eliminado
 *        '422':
 *          description: Error de validacion.
 */
router.delete('/delete/:id', validatorGetItem, deleteItem);

module.exports = router;