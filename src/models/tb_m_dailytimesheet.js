export default function(sequelize, DataTypes) {
  return sequelize.define('tb_m_dailytimesheet', {
    dailytimesheet_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    input_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    starts_hours: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_hours: {
      type: DataTypes.DATE,
      allowNull: false
    },
    attendance_status: {
      type: DataTypes.ENUM('Present','Sick','Business Trip','Leave','Not Working'),
      allowNull: false
    },
    activity: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timesheet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_m_timesheet',
        key: 'timesheet_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_m_dailytimesheet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "dailytimesheet_id" },
        ]
      },
      {
        name: "timesheet_id",
        using: "BTREE",
        fields: [
          { name: "timesheet_id" },
        ]
      },
    ]
  });
}
