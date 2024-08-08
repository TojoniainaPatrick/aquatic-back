module.exports = ( sequelize, DataTypes ) => {
    const Task = sequelize.define(
        'Task',
        {
            task_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            task_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notNull: { msg: 'Le nom de tâche est une propriété requise.' },
                    notEmpty: { msg: 'Le nom de tâche ne peut pas être vide.' }
                }
            },
            task_status: {
                type: DataTypes.STRING,
                defaultValue: 'new'
            },
            task_notified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            task_description: DataTypes.TEXT,
            task_start_date: DataTypes.DATE,
            task_end_date: DataTypes.DATE,
            task_finished_at: DataTypes.DATE
        },
        {
            timestamps: true,
            createdAt: 'task_created_at',
            updatedAt: 'task_updated_at'
        }
    )

    return Task
}