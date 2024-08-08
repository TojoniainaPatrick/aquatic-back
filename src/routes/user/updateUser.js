const { ValidationError, UniqueConstraintError } = require("sequelize")
const { User } = require('../../database/sequelize')

module.exports = app => {
    app.put('/user/update/:user_id', async ( req, res ) => {
        await User.findByPk( req.params.user_id )
        .then( async user => {
            if(!user){
                res.status(404).json({ message: 'L\'utilisateur n\'existe pas.' })
            }
            else{
                let updatedUser = await user.update( req.body )
                res.status(200).json({
                    message: 'Les informations de l\'utilisateur ont été modifiées avec succès.',
                    data: updatedUser
                })
            }
        })
        .catch( error => {
            if ( error instanceof ValidationError || error instanceof UniqueConstraintError ) {
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