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
      type: DataTypes.INTEGER(2),
      allowNull: false,
      field: 'service_attr'
    },
    requireSpeed: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      field: 'require_speed'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
    },
    totalScore: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      field: 'total_score'
    },
    workerId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'worker_id'
    }
  }, {
    tableName: 'evaluate'
  });

  Model.associate = function() {

  }

  return Model;
};
