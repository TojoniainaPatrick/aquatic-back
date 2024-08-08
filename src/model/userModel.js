const bcrypt = require('bcrypt')

module.exports = ( sequelize, DataTypes ) => {

    const User = sequelize.define(
        'User',
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: ' Le rôle d\'utilisateur est une propriété requise.'},
                    notEmpty: { msg: ' Le rôle d\'utilisateur ne peut pas être vide.'}
                }
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Le nom d\'utilisateur a été déjà pris. Veuillez indiquer un autre nom!'
                },
                validate: {
                    notNull: { msg: ' Le nom d\'utilisateur est une propriété requise.'},
                    notEmpty: { msg: ' Le nom d\'utilisateur ne peut pas être vide.'}
                }
            },
            user_email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Cette adresse est déjà associée à un compte. Veuillez indiquer une autre adresse!'
                },
                validate: {
                    notNull: { msg: ' L\'adresse mail est une propriété requise.'},
                    notEmpty: { msg: ' L\'adresse mail ne peut pas être vide.'},
                    isEmail: { msg: ' Veuillez saisir une adresse mail valide! '}
                }
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: false,
                set( value ){
                    this.setDataValue( 'user_password', bcrypt.hashSync(value, 10) )
                },
                validate: {
                    notNull: { msg: ' Le mot de passe est une propriété requise.'},
                    notEmpty: { msg: ' Le mot de passe ne peut pas être vide.'}
                }
            },
            user_image_url: {
                type: DataTypes.TEXT,
                defaultValue: `${process.env.BASE_URL}images/defaultUserImage`
            },
            user_account_status: {
                type: DataTypes.STRING,
                defaultValue: 'waiting'
            }
        }
    )

    return User
}