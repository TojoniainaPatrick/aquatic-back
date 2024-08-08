const { User } = require("../../database/sequelize")

module.exports = app => {
    app.put('/user/restorepassword', async ( req, res ) => {

        const { user_email, user_password } = req.body

        if( user_email && user_password){
            await User.findOne({ where: { user_email } })
            .then( async user => {
                if ( !user ){
                    res.status(403).json({ message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse mail!' })
                }
                else{
                    await user.update({ user_password })
                    res.status(200).json({ message: 'Mot de passe restauré avec succès.'})
                }
            })
            .catch( error => {
                res.status(500).json({ 
                    message: error.message,
                    data: error
                })
            })
        }
        else{
            res.status(400).json({ message: 'Merci de bien vouloir compléter tous les champs.' })
        }
    })
}