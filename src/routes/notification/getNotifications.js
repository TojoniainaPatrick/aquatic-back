const { Notification } = require('../../database/sequelize')

module.exports = app => {
    app.get('/notification/list', async ( req, res ) => {
        await Notification.findAll()
        .then( notifications => {
            res.status(200).json({
                message: 'Liste des notifications',
                data: notifications
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