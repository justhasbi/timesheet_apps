//const Sequelize = require('sequelize');
export default function (sequelize, DataTypes) {
  return sequelize.define(
    "tb_m_timesheet",
    {
      timesheet_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM("Approved", "Rejected", "Waiting", ""),
        allowNull: false,
      },
      period: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tb_m_employee",
          key: "employee_id",
        },
      },
    },
    {
      sequelize,
      tableName: "tb_m_timesheet",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "timesheet_id" }],
        },
        {
          name: "employee_id",
          using: "BTREE",
          fields: [{ name: "employee_id" }],
        },
      ],
    }
  );
}
