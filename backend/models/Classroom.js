const mongoose = require("mongoose")
const config = require("../../app.config")

const { Schema, model, Types } = mongoose

const scheme = new Schema({
    created: { type: Date, default: new Date },
    modified: { type: Date },
    name: { type: String, default: '' },
    supervisor: { type: Object },
    level: { type: Object }
});

const Classroom = model("Classroom", scheme);

module.exports.save = async (data) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const classroom = new Classroom({ ...data, modified: Date.now() })
    const res = await classroom.save()
    console.timeLog(res)
    await mongoose.disconnect()
    return classroom
}

module.exports.findById = async (id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const classroom = await Classroom.findById(id)
    await mongoose.disconnect()
    return classroom
}

module.exports.find = async (data = {}) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    console.log('asdasd')
    const classroom = await Classroom.find()
    console.log('11111111')
    await mongoose.disconnect()
    return classroom
}

module.exports.update = async (data) => {
    const { _id } = data
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const classroom = await Classroom.updateOne({ _id, modified }, { ...data, modified: Date.now() })
    await mongoose.disconnect()
    return classroom
}

module.exports.delete = async (_id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const classroom = await Classroom.findOneAndDelete({ _id })
    await mongoose.disconnect()
    return classroom
}