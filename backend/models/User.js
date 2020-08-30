const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const { Schema, model, Types } = mongoose
const config = require("../api.config")

const userScheme = new Schema({
    id: { type: Types.ObjectId },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = model("User", userScheme);

module.exports.save = async ({ email }) => {
    const user = await User.findOne({ email })
    if (user) {
        await mongoose.disconnect()
        return false
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()
    await mongoose.disconnect()
    return true
}

module.exports.findById = async (id) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const user = await User.findById(id)
    await mongoose.disconnect()
    return user
}

module.exports.findOne = async ({ email, password}) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options)
    const user = await User.findOne({ email })
    if (user){
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) return user 
    }
    await mongoose.disconnect()
    return false
}