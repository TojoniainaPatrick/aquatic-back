const { Subtask, Task, User } = require("../../database/sequelize")

module.exports = app => {
    app.get('/subtask/byId/:subtask_id', async ( req, res ) => {
        await Subtask.findByPk( req.params.subtask_id, { include: [ Task ] })
        .then( subTask => {
            if ( !subTask ){
                res.status(404).json({
                    message: 'La sous-tâche demandée n\'existe pas.Réessayer avec un autre idantifiant.'
                })
            }
            else {
                res.status(200).json({
                    message: `Sous-tâche: ${ subTask.subtask_name }`,
                    data: subTask
                })
            }
        })
    })
}