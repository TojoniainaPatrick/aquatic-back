const { Task, Subtask, User } = require("../../database/sequelize")

module.exports = app => {
    app.get('/task/byId/:task_id', async ( req, res ) => {
        await Task.findByPk( req.params.task_id, { include: [ Subtask, User ]} )
        .then( task => {
            if( !task ){
                res.status(400).json({
                    message: 'La tâche demandée n\'existe pas.'
                })
            }
            else{
                res.status(200).json({
                    message: `Tâche: ${task.task_name}`,
                    data: task
                })
            }
        })
        .catch( error => {
            res.status(500).json({
                message: 'Une erreur venant du serveur s\'est produite. Veuillez réessayer dans quelques instants',
                data: error
            })
        })
    })
}