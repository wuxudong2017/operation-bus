/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('evaluate', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'order_id'
    },
    serviceAttr: {
      type: "DOUBLE(4,2)",
      allowNull: false,
      field: 'service_attr'
    },
    requireSpeed: {
      type: "DOUBLE(4,2)",
      allowNull: false,
      field: 'require_speed'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
    },
    totalScore: {
      type: "DOUBLE(5,2)",
      allowNull: false,
      field: 'total_score'
    },
    workerId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'worker_id'
    },
    createTime:{
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue:function(){
        return new Date().getTime()
      },
      field:'create_time'
    }
  }, {
    tableName: 'evaluate'
  });

  Model.associate = function() {
    app.model.Evaluate.belongsTo(app.model.SysUserInfo,{foreignKey:'worker_id',targetKey:'id'})
    app.model.Evaluate.hasOne(app.model.SysOrder,{foreignKey:'id',targetKey:'orderId'})
  }

  return Model;
};
