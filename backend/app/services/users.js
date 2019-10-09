const User = require('../models/user')

const getUser = async (id = null) => {

    if (id) {
        return await User.findById(id)
            .exec()
            .then(result => {
                if (result) {
                    return result
                } else {
                    return { error: { status: 404, message: 'User notFounded' } }
                }
            })
            .catch(err => err)
    }
    return await User.find()
        .exec()
        .then(result => {
            return result
        })
        .catch(err => err)
}


const saveUser = async (obj) => {

    const { email } = obj
    if (await User.findOne({ email })) {
        return {
            error: {
                status: 400,
                message: 'User already exists'
            }
        }
    }
    const user = new User({
        name: obj.name,
        email: obj.email,
        address: obj.address,
        city: obj.city,
        state: obj.state,
    })

    return await user.save()
        .then(result => {
            return result
        })
        .catch(err => err)
}

const updateUser = async (id, obj) => {
    return await User.updateOne({ _id: id }, { $set: obj })
        .exec()
        .then(result => {
            return result
        })
        .catch(err => err)
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id)
        .exec()
        .then(result => result)
        .catch(err => err)
}

module.exports = {
    getUser,
    saveUser,
    updateUser,
    deleteUser
}