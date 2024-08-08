const { User } = require("../../database/sequelize");
const { upload } = require("../../fileUploader/multerConfig");

module.exports = app => {
    app.post('/upload', upload.single('image'), async (req, res) => {

            await User.update(
                { user_image_url: `${process.env.BASE_URL}${req.file.filename}` },
                {
                    where: {
                        user_id: req.params.user_id,
                    },
                },
            )
            .then( _=> {
                res.json({ 
                    message: 'File uploaded successfully',
                    data: `${process.env.BASE_URL}${req.file.filename}`
                })
            })
            .catch( error => {
                res.status(500).json({
                    message: 'Nous n\'avons pas pu récupérer l\'image. Veuillez réessayer dans quelques instants!',
                    data: error
                })
            })

    });
        
}