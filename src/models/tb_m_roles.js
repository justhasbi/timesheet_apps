//const Sequelize = require('sequelize');
export default function(sequelize, DataTypes) {
  return sequelize.define('tb_m_roles', {
    role_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_m_roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
}
