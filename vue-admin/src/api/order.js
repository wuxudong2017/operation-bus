
import  request from '@/utils/request.js'
/**
 *  获取首页信息
 *
 *   */
export function getIndexAll(){
    return request({
        type:'get',
        url:'/api/admin/index'
    })
}
// 故障饼状图统计
export function getFaultCount(){
    return request({
        type:'get',
        url:'/api/admin/getfault'
    })
}




/**
 * 工单管理
 * 
 */
// 获取工单列表

export function getOrderListA(data){
    return request({
        url:'/api/admin/order/new',
        method:'get',
    })
}
export function getOrderList(data){
    return request({
        url:'/api/admin/order',
        method:'get',
        params:data
    })
}
// 新加工单
export function createOrder(data){
    return request({
        url:'/api/admin/order',
        method:'post',
        data
    })
}
// 根据工单id 获取工单
export function getOrder(data){
    return request({
        url:'/api/admin/order/'+data.id,
        method:'get',
    })
}
// 根据工单id 更新
export function editOrder(id,data){
    return request({
        url:'/api/admin/order/'+id,
        method:'put',
        data
    })
}
// 根据id 删除工单

export function deleteOrder(data){
    console.log(data)
    return request({
        url:'/api/admin/order/'+data,
        method:'delete',
    })
}

/**
 * 设备类型管理
 * 
 */
// 获取设备类型列表

export function getEquipmentListA(data){
    return request({
        url:'/api/admin/equipment/new',
        method:'get',
    })
}
export function getEquipmentList(data){
    return request({
        url:'/api/admin/equipment',
        method:'get',
        params:data
    })
}
// 新加设备类型
export function createEquipment(data){
    return request({
        url:'/api/admin/equipment',
        method:'post',
        data
    })
}
// 根据设备类型id 获取设备类型
export function getEquipment(data){
    return request({
        url:'/api/admin/equipment/'+data+'/edit',
        method:'get',
    })
}
// 根据设备类型id 获取角色
export function editEquipment(id,data){
    return request({
        url:'/api/admin/equipment/'+id,
        method:'put',
        data
    })
}
// 根据id 删除设备类型

export function deleteEquipment(data){
    console.log(data)
    return request({
        url:'/api/admin/equipment/'+data,
        method:'delete',
    })
}
// 获取所有正常设备类型
export function getEquipmentAll(data){
    return request({
        url:'/api/admin/getAll',
        method:'get',
    })
}



/**
 * 设备管理
 * 
 */
// 获取设备列表
export function getAllType(){
    return request({
        url:'/api/admin/getAllType',
        method:'get'
    })
}


export function getDeviceListA(data){
    return request({
        url:'/api/admin/device/new',
        method:'get',
    })
}
export function getDeviceList(data){
    return request({
        url:'/api/admin/device',
        method:'get',
        params:data
    })
}
// 新加设备
export function createDevice(data){
    return request({
        url:'/api/admin/device',
        method:'post',
        data
    })
}
// 根据设备id 获取设备
export function getDevice(data){
    return request({
        url:'/api/admin/device/'+data+'/edit',
        method:'get',
    })
}
// 根据设备id 获取角色
export function editDevice(id,data){
    return request({
        url:'/api/admin/device/'+id,
        method:'put',
        data
    })
}
// 根据id 删除设备

export function deleteDevice(data){
    return request({
        url:'/api/admin/device/'+data,
        method:'delete',
    })
}
// 批量删除列表
export function deleteDeviceS(data){
    return request({
        url:'/api/admin/device/deletes',
        method:'post',
        data
    })
}

//------------------------文档管理---------------------------///

/**
 * 
 * @param {故障标签管理} data 
 */

// 获取全部故障标签列表
export function getFileList(data){
    return request({
        url:'/api/admin/file',
        method:'get',
        params:data,
    })
}
// 新加故障标签
export function createFile(data){
    return request({
        url:'/api/admin/file',
        method:'post',
        data
    })
}
// 根据故障标签id 获取故障标签
export function getFile(data){
    return request({
        url:'/api/admin/file/'+data+'/edit',
        method:'get',
    })
}
// 根据故障标签id 获取故障标签
export function editFile(id,data){
    return request({
        url:'/api/admin/file/'+id,
        method:'put',
        data
    })
}
// 根据id 删除故障标签

export function deleteFile(data){
    return request({
        url:'/api/admin/file/'+data,
        method:'delete',
    })
}

//---------------------故障清单-----------------------//
export function getFaultList(data){
    return request({
        url:'/api/admin/getFaultList',
        method:'get',
        params:data
    })
}
// 故障清单表
export function deviceTable(data){
    return request({
        url:'/api/admin/getdeviceTable',
        method:'get',
        params:data
    })
     
}
// 维修人员考核
export function assessment(data){
    return request({
        url:'/api/admin/assessment',
        method:'get',
        params:data
    })
}
