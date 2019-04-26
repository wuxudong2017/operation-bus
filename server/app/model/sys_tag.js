/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysTag', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'name'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'create_time'
    }
    
  }, {
    tableName: 'sys_tag'
  });

  Model.associate = function() {
    app.model.SysTag.hasOne(app.model.SysOrder,{foreignKey:'tag_id',targetKey:'id'})
  }

  return Model;
};
