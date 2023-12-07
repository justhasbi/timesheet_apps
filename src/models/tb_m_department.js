//const Sequelize = require('sequelize');
export default function(sequelize, DataTypes) {
  return sequelize.define('tb_m_department', {
    department_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    department_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_m_department',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
}
