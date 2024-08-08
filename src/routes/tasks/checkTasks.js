const { Task, Subtask, User, Notification } = require("../../database/sequelize")
const dayjs = require('dayjs')

module.exports = app => {
    app.get('/task/check', async ( req, res ) => {
        await Task.findAll({ include: [ Subtask, User ] })
        .then( async tasks => {

            const result = tasks.filter( task => 
                task.task_status == 'approved' &&
                task.task_notified == false &&
                dayjs().isAfter(dayjs(task.task_end_date))
            )

            result.map( async task => {
                await Notification.create({
                    notification_object: 'Tâche non accomplie',
                    notification_object_reference: task.task_id,
                    notification_content: `La date limite prévue pour la tâche numéro ${task.task_id?.toString().toUpperCase()} a été dépassée.`
                })
                await task.update({ task_notified: true })
            })

            res.status(200).json({
                message: 'Liste des tâches non accomplies.',
                data: result
            })
        })
        .catch( error => {
            const message = `la liste des tâches n'a pas pu ëtre recuperée! Veuillez réessayer dans quelques instants`
            res.status(500).json({message, data: error })
        })
    })
}