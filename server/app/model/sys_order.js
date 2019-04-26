/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysOrder', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true,
      field: 'id'
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
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'remark'
    },
    faultDesc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'fault_desc'
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
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'status'
    },
    createTime:{
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'create_time'
    },
    picture:{
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'picture'
    },
    updateTime:{
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'update_time'
    },
    workerId:{
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'worker_id'
    },
    workername:{
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'workername'
    }
    
  }, {
    tableName: 'sys_order'
  });

  Model.associate = function() {
    app.model.SysOrder.belongsTo(app.model.XxJbxx,{foreignKey:'schoolId',targetKey:'xxJbxxId'})
    app.model.SysOrder.belongsTo(app.model.SysSchoolUser,{foreignKey:'userId',targetKey:'id'})
    app.model.SysOrder.belongsTo(app.model.SysTag,{foreignKey:'tagId',targetKey:'id'})
    app.model.SysOrder.belongsTo(app.model.SysEquipment,{foreignKey:'equipmentId',targetKey:'id'})
    app.model.SysOrder.hasOne(app.model.SysOrderStatus,{foreignKey:'orderId',targetKey:'id'})
  }

  return Model;
};
