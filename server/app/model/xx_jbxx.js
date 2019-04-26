/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('xxJbxx', {
    xxJbxxId: {
      type: DataTypes.STRING(40),
      allowNull: false,
      primaryKey: true,
      field: 'XX_JBXX_ID'
    },
    xxbsm: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'XXBSM'
    },
    xxmc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'XXMC'
    },
    xxywmc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'XXYWMC'
    },
    xxdz: {
      type: DataTypes.STRING(180),
      allowNull: true,
      field: 'XXDZ'
    },
    xxdzdm: {
      type: DataTypes.STRING(12),
      allowNull: true,
      field: 'XXDZDM'
    },
    xxzdcxlxdm: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'XXZDCXLXDM'
    },
    sdgljyxzdm: {
      type: DataTypes.STRING(12),
      allowNull: true,
      field: 'SDGLJYXZDM'
    },
    sdgljyxzmc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'SDGLJYXZMC'
    },
    sszgjyxzdm: {
      type: DataTypes.STRING(12),
      allowNull: true,
      field: 'SSZGJYXZDM'
    },
    sszgjyxzmc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'SSZGJYXZMC'
    },
    xxbxlxdm: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'XXBXLXDM'
    },
    xxjbzdm: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'XXJBZDM'
    },
    xzxm: {
      type: DataTypes.STRING(36),
      allowNull: true,
      field: 'XZXM'
    },
    xzsjhm: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'XZSJHM'
    },
    bgdh: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'BGDH'
    },
    czdh: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'CZDH'
    },
    yzbm: {
      type: DataTypes.STRING(6),
      allowNull: true,
      field: 'YZBM'
    },
    wzzydz: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'WZZYDZ'
    },
    dwdzxx: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'DWDZXX'
    },
    xxxz: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'XXXZ'
    },
    xxrxnl: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'XXRXNL'
    },
    czxz: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'CZXZ'
    },
    czrxnl: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'CZRXNL'
    },
    gzxz: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'GZXZ'
    },
    gzrxnl: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'GZRXNL'
    },
    tbryx: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'TBRYX'
    },
    zzjgdm: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'ZZJGDM'
    },
    jxnf: {
      type: DataTypes.STRING(4),
      allowNull: true,
      field: 'JXNF'
    },
    frdjzh: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'FRDJZH'
    },
    xqr: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'XQR'
    },
    xxtdcq: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'XXTDCQ'
    },
    tdzh: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'TDZH'
    },
    jszxsdm: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'JSZXSDM'
    },
    hbgd: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'HBGD'
    },
    xxjd: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'XXJD'
    },
    xxwd: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'XXWD'
    },
    szdjjsxdm: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'SZDJJSXDM'
    },
    szdmzsxdm: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'SZDMZSXDM'
    },
    szddysxdm: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'SZDDYSXDM'
    },
    zsbj: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'ZSBJ'
    },
    zjxyydm: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'ZJXYYDM'
    },
    fzjxyydm: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'FZJXYYDM'
    },
    lsyg: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: 'LSYG'
    },
    dlszssmzxxdm: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'DLSZSSMZXXDM'
    },
    fsgxxxbs: {
      type: DataTypes.STRING(10),
      allowNull: true,
      field: 'FSGXXXBS'
    },
    sszgdwm: {
      type: DataTypes.STRING(12),
      allowNull: true,
      field: 'SSZGDWM'
    },
    fddbr: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'FDDBR'
    },
    xymym: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'XYMYM'
    },
    xxztm: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'XXZTM'
    },
    sfzxxbz: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'SFZXXBZ'
    },
    sszxxId: {
      type: DataTypes.STRING(40),
      allowNull: true,
      field: 'SSZXX_ID'
    },
    sjlybzm: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'SJLYBZM'
    },
    lrr: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'LRR'
    },
    lrsj: {
      type: DataTypes.STRING(19),
      allowNull: false,
      field: 'LRSJ'
    },
    gxr: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'GXR'
    },
    gxsj: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'GXSJ'
    },
    sfzxxdg: {
      type: DataTypes.STRING(1),
      allowNull: true,
      field: 'SFZXXDG'
    },
    xxjs: {
      type: DataTypes.STRING(4000),
      allowNull: true,
      field: 'XXJS'
    },
    ssxzjd: {
      type: DataTypes.STRING(12),
      allowNull: true,
      field: 'SSXZJD'
    },
    xxbm: {
      type: DataTypes.STRING(3),
      allowNull: true,
      field: 'XXBM'
    }
  }, {
    tableName: 'xx_jbxx'
  });

  Model.associate = function() {

  }

  return Model;
};
