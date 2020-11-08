module.exports = {
    serverPort: 5000,
    appPort: 4200,
    mongoose: {
        url: 'mongodb+srv://admin:admin531@cluster0.fmlbv.azure.mongodb.net/app?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    jwtSecret: 'SchoolApp secret',
    session: {
        name: 'sid',
        secret: 'ssh!quiet,it\'asecret',
        lifetime: 1000 * 60, //1 minute,
        secure: process.env.NODE_ENV !== 'production'
    },
}