const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API Config info
 */
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Fullstack-Practical-Case",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:4000/api",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            employeeRegister: {
                type: "object",
                required: ["name", "lastname"],
                properties: {
                    name: {
                        type: "string",
                    },
                    lastname: {
                        type: "string",
                    },
                },
            },
        },
    },
};

/**
 * Opciones
 */
const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

const openAPIconfiguration = swaggerJsdoc(options);
module.exports = openAPIconfiguration;
