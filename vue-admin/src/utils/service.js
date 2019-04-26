let SERVICEURL ={}
if(process.env.NODE_ENV.toLowerCase()==="development"){
    SERVICEURL.api = "http://127.0.0.1:7001" // 开发环境下的服务器地址
}else{
    SERVICEURL.api = "http://192.168.18.114:7001" // 在生产环境下的服务器地址

}
export default SERVICEURL