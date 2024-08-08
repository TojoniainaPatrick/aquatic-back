const { User } = require("../../database/sequelize")
const bcrypt = require('bcrypt')

module.exports = app => {
    app.post('/user/authenticate', async ( req, res ) => {

        const { user_email, user_password } = req.body

        if( user_email && user_password )
        {
            await User.findOne({ where: { user_email } })
            .then( user => {
                if ( !user ){
                    res.status(403).json({ message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse mail!' })
                }
                else{
                    if( bcrypt.compareSync(user_password, user.user_password) ){
                        res.status(200).json({
                            message: 'Utilisateur authentifié avec succès',
                            data: user
                        })
                    }
                    else{
                        res.status(403).json({ message: 'Mot de passe incorrect'})
                    }
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