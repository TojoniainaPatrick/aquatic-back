const { ValidationError, UniqueConstraintError } = require("sequelize")
const { Notification } = require("../../database/sequelize")

module.exports = app => {

    app.post('/notifications/create', async ( req, res ) => {
        try {
            req.body.notifications.map( async notification => await Notification.create( notification ))
            res.status(201).json({ message: 'Notification(s) envoyée(s) avec succès.'})
        } catch (error) {
            if( error instanceof ValidationError || error instanceof UniqueConstraintError )
                {
                    res.status(400).json({
                        message: error.message,
                        data: error
                    })
                }
                else{
                    res.status(500).json({
                        message: error.message,
                        data: error
                    })
                }
        }
    })

    app.post('/notification/create', async ( req, res ) => {
        await Notification.create( req.body )
        .then( notification => {
            res.status(201).json({ 
                message: 'Notification envoyée avec succès.',
                data: notification
            })
        })
        .catch( error => {
            if( error instanceof ValidationError || error instanceof UniqueConstraintError )
            {
                res.status(400).json({
                    message: error.message,
                    data: error
                })
            }
            else{
                res.status(500).json({
                    message: error.message,
                    data: error
                })
            }
        })
    })
}