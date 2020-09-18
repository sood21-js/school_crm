const mongoose = require("mongoose")
const { Schema, model, Types } = mongoose
const config = require("../api.config")

const scheme = new Schema({
    action: { type: String, required: true },
    userId: { type: String, unique: true },
    date: { type: Date, default: new Date },
    details: { type: String, required: true },
});

const Log = model("Log", scheme);

module.exports.save = async (data) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const log = new Log(data)
    await log.save()
    await mongoose.disconnect()
    return log
}

module.exports.findById = async (id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const log = await Log.findById(id)
    await mongoose.disconnect()
    return log
}

module.exports.findOne = async (data) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    let log = await Log.findOne(data)
    await mongoose.disconnect()
    return log
}

module.exports.find = async (data = {}) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const logs = await Log.find().or(data)
    await mongoose.disconnect()
    return logs
}