const { User } = require('../../database/sequelize')

module.exports = app => {
    app.delete('/user/delete/:user_id', async ( req, res ) => {
        await User.findByPk( req.params.user_id )
        .then( async user => {
            if( !user ){
                res.status(404).json({ message: 'L\'utilisateur n\'existe pas.' })
            }
            else {
                await user.destroy()
                .then( _ => res.status(200).json({ message: 'Utilisateur supprimé avec succès!' }))
            }
        })
        .catch( error => {
            res.status(500).json({
                message: error.message,
                data: error
            })
        })
    })
}