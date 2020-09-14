const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const config = require("../api.config")

const { Schema, model, Types } = mongoose


const scheme = new Schema({
    userId: { type: Types.ObjectId, unique: true },
    name: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: '',
    },
    middleName: {
        type: String,
        default: ''
    },
    login: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    group: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        default: ''
    },
    education: {
        type: String,
        default: ''
    }
});

const Profile = model("Profile", scheme);
Profile.init()
module.exports.save = async (data) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    console.log(data)
    const profile = new Profile(data)
    await profile.save()
    await mongoose.disconnect()
    return profile
}

module.exports.findById = async (id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const result = await Profile.findById(id)
    await mongoose.disconnect()
    return result
}

module.exports.find = async (data) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const result = await Profile.find().or(data)
    await mongoose.disconnect()
    return result
}

module.exports.update = async (data) => {
    const { _id } = data
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const result = await Profile.updateOne({ _id }, data)
    await mongoose.disconnect()
    return result
}

module.exports.delete = async (_id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const result = await Profile.findOneAndDelete({ _id })
    await mongoose.disconnect()
    return result
}