module.exports = ( sequelize, DataTypes ) => {
    const Notification = sequelize.define(
        'Notification',
        {
            notification_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            notification_object: {
                type: DataTypes.STRING,
                allowNull: false
            },
            notification_object_reference: {
                type: DataTypes.INTEGER
            },
            notification_content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            notification_status: {
                type: DataTypes.STRING,
                defaultValue: 'new'
            }
        },
        {
            timestamps: true,
            createdAt: 'notification_created_at',
            updatedAt: 'notification_seen_at'
        }
    )

    return Notification
}