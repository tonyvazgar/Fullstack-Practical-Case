const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        id: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
)

EmployeeSchema.plugin(mongooseDelete, { overrideMethods: "all" })
module.exports = mongoose.model("employee", EmployeeSchema);