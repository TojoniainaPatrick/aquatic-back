require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { initDb, User } = require('./src/database/sequelize')

const app = express()
const PORT = process.env.PORT || 3001

app
    .use(express.static('public'))
    .use(express.urlencoded({extended : true}))
    .use(express.json({extended: true}))
    .use(cors())
    .use('/upload/:user_id', express.static('./public/images'))

initDb()

//Updload image
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}); 

const upload = multer({
    storage : storage,
    limits : {fileSize: 1000000}
}); 

app.post('/upload/:user_id' , upload.single('image') , async (req, res) => {

    const image_url = `${process.env.BASE_URL}images/${req.file.filename}`

    await User.update(
        { user_image_url: image_url },
        {
            where: {
                user_id: req.params.user_id,
            },
        },
    )
    .then( _=> {
        res.status(200).json({
            success : 1,
            user_image_url: image_url
        });
    })
    .catch( error => {
        res.status(500).json({
            message: 'Nous n\'avons pas pu récupérer l\'image. Veuillez réessayer dans quelques instants!',
            data: error
        })
    })
});

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) { 
        res.status(500).json({
            success: 0,
            message: err.message
        }); 
    }
}

app.use(errHandler);  

// user routes
require('./src/routes/user/createUser')(app)
require('./src/routes/user/findUserById')(app)
require('./src/routes/user/getAllUsers')(app)
require('./src/routes/user/updateUser')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/user/authenticate')(app)
require('./src/routes/user/restorePassword')(app)
require('./src/routes/user/uploadImage')(app)
require('./src/routes/user/changePass')(app)

//task routes
require('./src/routes/tasks/createTask')(app)
require('./src/routes/tasks/findTaskById')(app)
require('./src/routes/tasks/getAllTasks')(app)
require('./src/routes/tasks/updateTask')(app)
require('./src/routes/tasks/deleteTask')(app)
require('./src/routes/tasks/checkTasks')(app)

// subtask routes
require('./src/routes/subTask/createSubTask')(app)
require('./src/routes/subTask/findSubTaskById')(app)
require('./src/routes/subTask/updateSubTask')(app)
require('./src/routes/subTask/deleteSubTask')(app)

// notification routes
require('./src/routes/notification/createNotification')(app)
require('./src/routes/notification/updateNotification')(app)
require('./src/routes/notification/getNotifications')(app)


// email cheking
require('./src/routes/email/emailChecking')(app)


// resource not found error handler
app.use(({res}) => {
    const message = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL. `
    res.status(404).json({message})
})


app.listen(PORT, () => console.log(`App listening on port ${PORT}`))