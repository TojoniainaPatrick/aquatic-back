module.exports = ( sequelize, DataTypes ) => {
    const SubTask = sequelize.define(
        'SubTask',
        {
            subtask_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            subtask_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notNull: { msg: 'Le nom de sous-tâche est une propriété requise.' },
                    notEmpty: { msg: 'Le nom de sous-tâche ne peut pas être vide.' }
                }
            },
            subtask_status: {
                type: DataTypes.STRING,
                defaultValue: 'new'
            },
            subtask_description: DataTypes.TEXT,
            subtask_start_date: DataTypes.DATE,
            subtask_end_date: DataTypes.DATE,
            subtask_finished_at: DataTypes.DATE
        },
        {
            timestamps: true,
            createdAt: 'subtask_created_at',
            updatedAt: 'subtask_updated_at'
        }
    )

    return SubTask
}