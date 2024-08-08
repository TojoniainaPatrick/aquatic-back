const { where } = require("sequelize")
const { Notification } = require("../../database/sequelize")

module.exports = app => {
    app.put('/notification/update/:notification_id', async ( req, res ) => {

        const notification_id = req.params.notification_id
        
        await Notification.update( req.body, { where: { notification_id } })
        .then( _=>{
            res.status(200).json({
                message: 'Notification mise à jour avec succès.'
            })
        })
        .catch( error => {
            res.status(500).json({ message: error.message })
        })
    })
}