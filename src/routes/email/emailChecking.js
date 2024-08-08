const { User } = require("../../database/sequelize")
const { transporter } = require("../../email/sendEmail")
const otpGenerator = require('otp-generator')

module.exports = app => {
    app.post('/restorepass/email/checking', async ( req, res ) => {

        const { user_email } = req.body

        if( user_email )
        {
            await User.findOne({ where: { user_email } })
            .then( user => {
                if ( !user ){
                    res.status(403).json({ message: 'Nous n\'avons pas pu trouver votre compte. Veuillez verifier votre adresse mail!' })
                }
                else{
                    
                    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: user_email,
                        subject: 'Réinitialisation de mot de passe - Protégez votre compte AQUATIC SERVICE',
                        html: `
                        <html>
                            <body>
                                <div style="width: 70vw; margin: auto;">

                                    <h1 style="text-align: center; font-size: 2.5rem; font-family: 'Times New Roman', Times, serif; color: darkblue;"> AQUATIC SERVICE </h1>

                                    <br>

                                    <p>Bonjour ${user.user_name},</p>

                                    <p>
                                        Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.Pour réinitialiser votre mot de passe, veuillez utiliser le code ci-dessous :
                                    </p>

                                    <p style="font-style: italic; letter-spacing: 2.5px; font-weight: bolder;">
                                        CODE: <span style="text-align: center; font-size: medium; font-family: 'Times New Roman', Times, serif; color: darkblue;">${otp}</span>
                                    </p>

                                    <p>
                                        Conseils de sécurité :
                                        <ul style="list-style-type: none; color: gray;">
                                            <li>- Ce code expire dans 6 heures</li>
                                            <li>- Choisissez un mot de passe unique et complexe</li>
                                            <li>- N'utilisez jamais le même mot de passe sur plusieurs sites</li>
                                        </ul>  
                                    </p>

                                    <p>
                                        Si vous n'avez pas demandé cette réinitialisation, veuillez :
                                        <ul style="list-style-type: none; color: gray;">
                                            <li>1. Ignorer cet e-mail</li>
                                            <li>2. Vérifier la sécurité de votre compte</li>
                                        </ul>
                                    </p>
                                    
                                    <p>Cordialement,</p>
                                    <p>L'équipe    <span style="font-weight: bolder; color: darkblue; letter-spacing: 2px; font-style: italic;">AQUATIC SERVICE</span></p>

                                </div>
                            </body>
                        </html>`
                    }

                    transporter.sendMail(mailOptions, ( error, info ) => {
                        if(error) {
                            res.status(500).json({
                                message: 'Nous n\'avons pas pu envoyer le code à ' + user_email + '. Veuillez réessayer dans quelques instants'
                            })
                        }
                        else {
                            user.user_otp = otp
                            res.status(200).json({ 
                                message: 'Un code a été envoyé à ' + user_email,
                                data: user
                            })
                        }
                    })
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
            res.status(400).json({ message: 'Merci de bien vouloir indiquer votre addresse mail.' })
        }
    })

    app.post('/email/checking', async ( req, res ) => {
        const { user_email  } = req.body

        if( user_email )
        {
            
            const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

            const mailOptions = {
                from: process.env.EMAIL,
                to: user_email,
                subject: 'Votre code de confirmation pour AQUATIC SERVICE',
                html: `
                <html>
                    <body>
                        <div style="width: 70vw; margin: auto;">

                            <h1 style="text-align: center; font-size: 2.5rem; font-family: 'Times New Roman', Times, serif; color: darkblue;"> AQUATIC SERVICE </h1>

                            <br>

                            <p>Bonjour,</p>

                            <p>
                                Nous sommes ravis de vous accueillir chez AQUATIC SERVICE ! Pour terminer la création de votre compte, veuillez utiliser le code de confirmation ci-dessous :
                            </p>

                            <p style="font-style: italic; letter-spacing: 2.5px; font-weight: bolder;">
                                CODE: <span style="text-align: center; font-size: medium; font-family: 'Times New Roman', Times, serif; color: darkblue;">${otp}</span>
                            </p>

                            <p>
                                Si vous n'avez pas demandé la création d'un compte, veuillez ignorer ce message.
                            </p>
                            
                            <p>Cordialement,</p>
                            <p>L'équipe    <span style="font-weight: bolder; color: darkblue; letter-spacing: 2px; font-style: italic;">AQUATIC SERVICE</span></p>

                        </div>
                    </body>
                </html>`
            }

            transporter.sendMail(mailOptions, ( error, info ) => {
                if(error) {
                    res.status(500).json({
                        message: 'Nous n\'avons pas pu envoyer le code à ' + user_email + '. Veuillez réessayer dans quelques instants'
                    })
                }
                else {
                    res.status(200).json({
                        message: 'Un code a été envoyé à ' + user_email,
                        data: { user_otp: otp }
                    })
                }
            })
        }
        else{
            res.status(400).json({ message: 'Merci de bien vouloir indiquer votre addresse mail.' })
        }
    })
}