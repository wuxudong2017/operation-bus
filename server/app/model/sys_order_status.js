/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysOrderStatus', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true,
      field: 'id'
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'order_id'
    },
    orderStatus: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'order_status'
    },
    orderContent: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'order_content'
    },
    workerId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'worker_id'
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'update_time'
    },
    remark:{
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'remark'
    },
    filelist:{
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'filelist'
    }
  }, {
    tableName: 'sys_order_status'
  });

  Model.associate = function() {
    app.model.SysOrderStatus.belongsTo(app.model.SysUserInfo,{foreignKey:'workerId',targetKey:'id'}) 
   
  }

  return Model;
};
