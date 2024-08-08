const { User } = require('../../database/sequelize')

module.exports = app => {
    app.get('/user/list', async ( req, res ) => {
        await User.findAll()
        .then( users => {
            res.status(200).json({
                message: 'Liste des utilisateurs',
                data: users
            })
        })
        .catch( error => {
            res.status(500).json({
                message: error.message,
                data: error
            })
        })
    })
}