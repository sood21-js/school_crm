const mongoose = require("mongoose")
const { Schema, model, Types } = mongoose

const profileScheme = new Schema({
    id: { type: Types.ObjectId },
    name: { type: String, required: true, unique: true },
    lastname: { type: String, required: true },
    bithday: {type: Date},
    position: {type: String},
    
});
module.exports = model("Profile", profileScheme);

