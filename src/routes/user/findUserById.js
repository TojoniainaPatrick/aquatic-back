const { User } = require('../../database/sequelize')

module.exports = app => {
    app.get('/user/byId/:user_id', async ( req, res ) => {

        // await User.findByPk( req.params.user_id, { include: 'Task' } )
        await User.findByPk( req.params.user_id )
        .then( user => {
            if(!user){
                res.status(404).json({ message: 'L\'utilisateur demandé n\'existe pas.' })
            }
            else{
                res.status(200).json({ message: `Utilisateur numero ${user.user_id}`, data: user })
            }
        })
        .catch( error => {
            res.status(500).json({ message: error.message, data: error })
        })
    })
}