const { Subtask } = require("../../database/sequelize")

module.exports = app => {
    app.delete('/subtask/delete/:subtask_id', async ( req, res ) => {
        await Subtask.findByPk( req.params.subtask_id )
        .then( async subtask => {
            if( !subtask ) {
                const message = `La sous-tâche demandée n'existe pas. Réessayer avec un autre identifiant`
                return res.status(404).json({message})
            }
            else{
                await subtask.destroy()
                .then( _=> {
                    res.status(201).json({
                        message: 'Sous-tâche supprimée avec succès.'
                    })
                })
            }
        })
        .catch( error => {
            res.status(500).json({
                message: 'La tâche n\'a pas pu être supprimée. Reessayer dans quelques instants.',
                data: error
            })
        })
    })
}