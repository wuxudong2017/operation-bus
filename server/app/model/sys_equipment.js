/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysEquipment', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
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
    uid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'uid'
    },
    pn: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'pn'
    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'brand'
    },
    thirdid: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'thirdid'
    },
    bugDate: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'bug_date'
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
      type: DataTypes.TINYINT(1),
      defaultValue:1,
      allowNull: false,
      field: 'status'
    },
    

  }, {
    tableName: 'sys_equipment'
  });

  Model.associate = function() {

  }

  return Model;
};
