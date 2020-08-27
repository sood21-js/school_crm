const mongoose = require("mongoose")
const { Schema, model, Types } = mongoose

const userScheme = new Schema({
    id: { type: Types.ObjectId },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
module.exports = model("User", userScheme);

