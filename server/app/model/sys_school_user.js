/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysSchoolUser', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'name'
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'phone'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: ' password'
    },
    username: {
      type: DataTypes.STRING(255),
      defaultValue:'',
      allowNull: true,
      field: 'username'
    },
    schoolId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'school_id'
    },
    avatar: {
      type:  DataTypes.STRING(255),
      allowNull: true,
      field: 'avatar'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'create_time'
    },
    
  }, {
    tableName: 'sys_school_user'
  });
  Model.associate = function() {
    app.model.SysSchoolUser.hasOne(app.model.SysOrder,{foreignKey:'id',targetKey:'userId'})
    app.model.SysSchoolUser.belongsTo(app.model.XxJbxx,{foreignKey:'schoolId',targetKey:'xxJbxxId'})
  }

  return Model;
};
