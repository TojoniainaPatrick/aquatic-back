const { ValidationError, UniqueConstraintError } = require("sequelize")
const { Subtask, Task, User } = require("../../database/sequelize")

module.exports = app => {
    app.put('/subtask/update/:subtask_id', async ( req, res ) => {
        await Subtask.findByPk( req.params.subtask_id )
        .then( async subtask => {
            if( !subtask ){
                res.status(404).json({
                    message: 'La sous-tâche demandée n\'existe pas.Reessayer avec un autre idantifiant.'
                })
            }
            else{
                await subtask.update( req.body )
                .then( async updatedSubTask => {

                    await Task.findByPk( updatedSubTask.task_id, { include: [ Subtask, User ]} )
                    .then( async task => {

                        if( task ){

                            const taskStatus = task.task_status
                            const isEverySubTaskFinished = task.SubTasks.every( subtaskItem => subtaskItem.subtask_status.toString().toLowerCase() == 'finished')

                            if(isEverySubTaskFinished){
                                await task.update({ task_status: 'finished', task_finished_at: new Date()})
                            }
                            else if( taskStatus.toString().toString() == 'finished' ){
                                await task.update({ task_status: 'approved', task_finished_at: null})
                            }

                        }
                    })
                })
                .then( updatedSubTask => {
                    res.status(200).json({
                        message: 'Sous-tâche modifiée avec succès.',
                        data: updatedSubTask
                    })
                })
            }
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
                    message: error?.message,
                    data: error
                })
            }
        })
    })
}