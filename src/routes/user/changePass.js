const { User } = require("../../database/sequelize")
const bcrypt = require('bcrypt')

module.exports = app => {
    app.put('/user/changepass', async ( req, res ) => {

        const { user_email, user_old_password, user_new_password } = req.body

        if( user_email && user_old_password && user_new_password )
        {
            await User.findOne({ where: { user_email } })
            .then( async user => {
                if ( !user ){
                    res.status(403).json({ message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse mail!' })
                }
                else{
                    if( bcrypt.compareSync(user_old_password, user.user_password) ){
                        await user.update({ user_password : user_new_password })
                        .then( _=>{
                            res.status(200).json({
                                message: 'Opération effectuée avec succès!',
                                data: user
                            })
                        })
                        .catch( error => {
                            res.status(500).json({
                                message: 'Nous n\'avons pas pu changer le mot de passe. Veuillez ressayer dans quelques instants!',
                                data: error
                            })
                        })
                    }
                    else{
                        res.status(403).json({ message: 'Mot de passe actuel incorrect'})
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