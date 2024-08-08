const { UniqueConstraintError, ValidationError } = require("sequelize")
const { Subtask } = require("../../database/sequelize")

module.exports = app => {
    app.post('/subtask/create', async ( req, res ) => {
        await Subtask.create( req.body )
        .then( subtask => {
            res.status(201).json({
                message: 'Sous-tâche créée avec succès.',
                data: subtask
            })
        })
        .catch( error => {
            if( error instanceof ValidationError || error instanceof UniqueConstraintError )
                {
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