const { ValidationError } = require("sequelize")
const { Task } = require("../../database/sequelize")

module.exports = app => {
    app.post('/task/create', async ( req, res ) => {
        await Task.create( req.body )
        .then( async createdTask => {

            if(req.body.subtasks){
                req.body.subtasks.forEach( async subTask => {
                    await createdTask.createSubTask(subTask)
                })
            }
            
            res.status(201).json({
                message: 'Tâche créée avec succès.'
            })
        })
        .catch( error => {
            if( error instanceof ValidationError )
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