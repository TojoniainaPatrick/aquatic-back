const { ValidationError, UniqueConstraintError } = require('sequelize')
const { User, Notification } = require('../../database/sequelize')

module.exports = app => {
    app.post('/user/create', async ( req, res ) => {
        await User.create(req.body)
        .then( async user => {

            await Notification.create({
                notification_object: 'Création de compte',
                notification_object_reference: user.user_id,
                notification_content: `Le compte de ${user.user_name?.toString().toUpperCase()} a été créé avec succès. Votre attention est requise.`
            })

            let message = `L'utilisateur ${user.user_name} a été créé`
            res.status(201).json({
                data: user,
                message
            })
        })
        .catch( error =>{
            if( error instanceof ValidationError ){
                let message = error.message
                let data = error
                res.status(406).json({ message, data })
            }
            else if( error instanceof UniqueConstraintError){
                let message = error.message
                let data = error
                res.status(406).json({ message, data })
            }
            else{
                const message = `Le compte n'a pas pu etre créé! Reessayer dans quelques intants.`
                res.status(500).json({message, data: error })
            }
        })
    })
}