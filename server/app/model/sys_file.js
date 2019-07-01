/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysFile', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'name'
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'url'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue:function(){
        return new Date().getTime()
      },
      field: 'create_time'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'status'
    },
    type: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      field: 'type'
    },
    suffix: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'suffix'
    },
  }, {
    tableName: 'sys_file'
  });

  Model.associate = function() {

  }

  return Model;
};
