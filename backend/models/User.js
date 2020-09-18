const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const { Schema, model, Types } = mongoose
const config = require("../api.config")

const scheme = new Schema({
    id: { type: Types.ObjectId },
    login: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = model("User", scheme);

module.exports.save = async ({ login, email, password }) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const userEmail = await User.findOne({ email })
    if (userEmail) {
        await mongoose.disconnect()
        return false
    }
    const userLogin = await User.findOne({ login })
    if (userLogin) {
        await mongoose.disconnect()
        return false
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ login, email, password: hashedPassword })
    await newUser.save()
    await mongoose.disconnect()
    return newUser
}

module.exports.findById = async (id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const user = await User.findById(id)
    await mongoose.disconnect()
    return user
}

module.exports.findOne = async ({ email, password }) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    let user = await User.findOne({ email })
    if (!user) {
        user = await User.findOne({ login: email })
    }
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            await mongoose.disconnect()
            return user
        }
    }
    await mongoose.disconnect()
    return false
}

module.exports.update = async (data) => {
    const { _id, email, login } = data
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const userEmail = await User.findOne({ email })
    if (userEmail && userEmail._id.toString() !== data._id) {
        await mongoose.disconnect()
        return false
    }
    const userLogin = await User.findOne({ login })
    if (userLogin && userLogin._id.toString() !== data._id) {
        await mongoose.disconnect()
        return false
    }
    const result = await User.updateOne({ _id }, { login, email })
    await mongoose.disconnect()
    return result
}

module.exports.delete = async (_id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const result = await User.findOneAndDelete({ _id })
    await mongoose.disconnect()
    return result
}