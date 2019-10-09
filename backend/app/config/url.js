const user = require('../routes/users')

const addURLs = (app) => {
    app.use('/user', user)
}

module.exports = {
    addURLs
}