const Op = require('sequelize').Op
const Sequelize = {
    host:'localhost',
    port:'3306',
    database:'operation',
    username:'root',
    password:'123456',
    dialect:'mysql',
    timezone:'+08:00',
    pool:{
        max:5,
        min:0
    },
    define:{
        timestamps:false
    },
    operatorsAliases: {
        $and:Op.and,
        $or:Op.or,
        $gt:Op.gt,
        $gte:Op.gte,
        $lt:Op.lt,
        $lte:Op.lte,
        $ne:Op.ne,
        $between:Op.between,
        $notBetween:Op.notBetween,
        $in:Op.in,
        $notIn:Op.notIn,
        $like:Op.like,
        $notLike:Op.notLike,
        $iLike:Op.iLike,
        $notILike:Op.notILike,
        $overlap:Op.overlap,
        $contains:Op.contains,
        $contained:Op.contained,
        $any:Op.any
    }
}
module.exports = Sequelize;
