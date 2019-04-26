// 会话超时出路
const url = require('url')
module.exports =(option,app)=>{
    return async function authAdmin(ctx,next){
        let pathName = url.parse(ctx.url).pathname;
        let token = ctx.request.headers.token
    if (token){
        await next();
       }else{
        if(pathName.indexOf('/login')>-1 || pathName.indexOf('/register')>-1|| pathName.indexOf('/schoolList')>-1 || pathName.indexOf('/upload')>-1){
            await next()
        }else{
            ctx.body ={
                code:99,
                message:'请登录',
                data:null
            }
           
        }
       }
    }
}