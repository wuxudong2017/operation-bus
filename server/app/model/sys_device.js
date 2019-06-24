/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysDevice', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      autoIncrement:true,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'name'
    },
    equipmentId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'equipment_id'
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
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'type'
    },
    changeModel: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'change_model'
    },
    factoryTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'factory_time'
    },
    overTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'over_time'
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
    awatar: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'awatar'
    },
    anStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'an_status'
    },
    position: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'position'
    },
    user: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'user'
    },
    userPhone: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'user_phone'
    },
    deviceStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue:1,
      field: 'device_status'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue:new Date().getTime(),
      field: 'create_time'
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue:new Date().getTime(),
      field: 'update_time'
    },
    numG: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue:0,
      field: 'num_g'
    },
    schoolId:{
      type:DataTypes.STRING(255),
      allowNull: false,
      field: 'school_id'

    },
    remarks:{
      type:DataTypes.STRING(255),
      allowNull: true,
      field: 'remarks'
    },
    deviceId:{
      type:DataTypes.INTEGER(10),
      allowNull: false,
      field: 'device_id'
    },
    typeIndex:{
      type:DataTypes.INTEGER(4),
      allowNull: false,
      field: 'type_index'
    },
  }, {
    tableName: 'sys_device',
  });

  Model.associate = function() {

  }

  return Model;
};
