const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../model/userModel');
const taskModel = require('../model/taskModel');
const subTaskModel = require('../model/subTaskModel');
const notificationModel = require('../model/notificationModel');

const sequelize = new Sequelize('aquatic-service', 'postgres', '1212', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});

const User = userModel( sequelize, DataTypes )
const Task = taskModel( sequelize, DataTypes )
const Subtask = subTaskModel( sequelize, DataTypes )
const Notification = notificationModel( sequelize, DataTypes )

const initDb = async _=> {

    // one to many relationship between task and task creator
    User.hasMany( Task, { foreignKey: 'task_created_by', allowNull: false } )
    Task.belongsTo( User, { foreignKey: 'task_created_by', onDelete: 'CASCAD' } )

    // one to many relationship between task and subtasks
    Task.hasMany( Subtask, { foreignKey: 'task_id', allowNull: false } )
    Subtask.belongsTo( Task, { foreignKey: 'task_id', onDelete: 'CASCAD' } )

    // one to many relationship  between user and notification
    User.hasMany( Notification, { foreignKey: 'notification_receiver', allowNull: false })
    Notification.belongsTo( User, {foreignKey: 'notification_receiver', onDelete: 'CASCAD'})

    sequelize.sync()
    // sequelize.sync({ alter: true })
    // sequelize.sync({ force: true })
}


module.exports = {
    sequelize,
    initDb,
    User,
    Task,
    Subtask,
    Notification
}