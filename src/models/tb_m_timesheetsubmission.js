//const Sequelize = require('sequelize');
export default function(sequelize, DataTypes) {
  return sequelize.define('tb_m_timesheetsubmission', {
    timesheet_submission_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    submission_status: {
      type: DataTypes.ENUM('Approve','Reject',''),
      allowNull: false
    },
    information: {
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
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_m_employee',
        key: 'manager_id'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_m_timesheetsubmission',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "timesheet_submission_id" },
        ]
      },
      {
        name: "timesheet_id",
        using: "BTREE",
        fields: [
          { name: "timesheet_id" },
        ]
      },
      {
        name: "manager_id",
        using: "BTREE",
        fields: [
          { name: "manager_id" },
        ]
      },
    ]
  });
}
