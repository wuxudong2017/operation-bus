/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('faultList', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      primaryKey: true,
      autoIncrement:true,
      field: 'id'
    },
    deviceId: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'device_id'
    },
    equipmentId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'equipment_id'
    },
    schoolId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'school_id'
    },
    tagId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'tag_id'
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'user_id'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'create_time'
    }
  }, {
    tableName: 'fault_list'
  });

  Model.associate = function() {
    app.model.FaultList.belongsTo(app.model.SysEquipment,{foreignKey:'equipmentId',targetKey:'id'})
    app.model.FaultList.belongsTo(app.model.SysTag,{foreignKey:'tagId',targetKey:'id'})
    app.model.FaultList.belongsTo(app.model.XxJbxx,{foreignKey:'schoolId',targetKey:'xxJbxxId'})
  }

  return Model;
};
