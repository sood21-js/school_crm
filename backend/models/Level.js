const mongoose = require("mongoose")
const config = require("../../app.config")

const { Schema, model } = mongoose

const scheme = new Schema({
    created: {type: Date, default: new Date},
    modified: {type: Date},
    name: {
        type: String,
        default: ''
    },
});

const Level = model("Level", scheme);

module.exports.save = async (data) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const level = new Level(data)
    await mongoose.disconnect()
    return level
}

module.exports.findById = async (id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const level = await Level.findById(id)
    await mongoose.disconnect()
    return level
}

module.exports.find = async (data = {}) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const level = await Level.find().or(data)
    await mongoose.disconnect()
    return level
}

module.exports.update = async (data) => {
    const { _id } = data
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const level = await Level.updateOne({ _id }, data)
    await mongoose.disconnect()
    return level
}

module.exports.delete = async (_id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const level = await Level.findOneAndDelete({ _id })
    await mongoose.disconnect()
    return level
}