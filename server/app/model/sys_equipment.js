/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysEquipment', {
    typeIndex:{
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      field: 'type_index'
    },
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'id'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'type'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'name'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'create_time'
    },
    awatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'awatar'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'status'
    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'brand'
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'provider'
    },
    changeModel: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'change_model'
    },
    util: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'util'
    },
    utilPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'util_price'
    },
    factoryTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'factory_time:'
    },
    overTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'over_time'
    },
  }, {
    tableName: 'sys_equipment'
  });

  Model.associate = function() {

  }

  return Model;
};
