const { Task, Subtask, User } = require("../../database/sequelize")

module.exports = app => {
    app.get('/task/list', async ( req, res ) => {
        await Task.findAll({ include: [ Subtask, User ] })
        .then( tasks => {
            res.status(200).json({
                message: 'Liste des tâches avec leurs sous-tâches.',
                data: tasks
            })
        })
        .catch( error => {
            const message = `la liste des tâches n'a pas pu ëtre recuperée! Veuillez réessayer dans quelques instants`
            res.status(500).json({message, data: error })
        })
    })
}