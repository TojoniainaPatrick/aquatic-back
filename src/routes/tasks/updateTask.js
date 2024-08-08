const { ValidationError, UniqueConstraintError } = require("sequelize")
const { Task } = require("../../database/sequelize")

module.exports = app => {
    app.put('/task/update/:task_id', async ( req, res ) => {
        await Task.findByPk( req.params.task_id )
        .then( async task => {
            if( !task ){
                res.status(404).json({
                    message: 'La tâche que vous avez essayée de modifier n\'existe pas.'
                })
            }
            else{
                await task.update( req.body )
                .then( updatedTask => {
                    res.status(200).json({
                        message: `La tâche numéro ${ updatedTask.task_id } a été modifiée avec succès`,
                        data: updatedTask
                    })
                })
            }
        })
        .catch( error => {
            if( error instanceof ValidationError || error instanceof UniqueConstraintError ){
                res.status(400).json({
                    message: error.message,
                    data: error
                })
            }
            else{
                res.status(500).json({
                    message: 'L\'prération n\'a pas pu être effectuée. Veuillez reessayer dans quelques instants.',
                    data: error
                })
            }
        })
    })
}