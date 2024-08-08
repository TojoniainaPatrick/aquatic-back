const { Task } = require("../../database/sequelize")

module.exports = app => {
    app.delete('/task/delete/:task_id', async ( req, res ) => {
        await Task.findByPk( req.params.task_id )
        .then( async task => {
            if( !task ) {
                const message = `La tâche demandée n'existe pas. Réessayer avec un autre identifiant`
                return res.status(404).json({message})
            }
            else{
                await task.destroy()
                .then( _=> {
                    res.status(201).json({
                        message: 'Tâche supprimée avec succès.'
                    })
                })
            }
        })
        .catch(error => {
            const message = `La tâche n'a pas pu être supprimée. Reessayer dans quelques instants. `
            res.status(500).json({message, data: error})
        })
    })
}