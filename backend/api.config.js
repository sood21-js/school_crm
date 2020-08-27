module.exports = {
    port: 5000,
    mongoose: {
        url: 'mongodb+srv://admin:admin531@cluster0.fmlbv.azure.mongodb.net/app?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    jwtSecret: 'SchoolApp secret'
}