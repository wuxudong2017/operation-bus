import  request from '@/utils/request.js'
// 获取用户列表
export function getUserList(data){
    return request({
        url:'/api/admin/user',
        method:'get',
        params:data
    })
}
// 新加用户
export function userListAdd(data){
    return request({
        url:'/api/admin/user',
        method:'post',
        data
    })
}
// 编辑用户 
export function userEdit(id,data){
    return request({
        url:'/api/admin/user/'+id,
        method:'put',
        data
    })
}
// 根据id 获取用户
export function getUser(data){
    return request({
        url:'/api/admin/user/'+data+'/edit',
        method:'get',
        data
    })
}
// 根据id 删除用户
export function deleteUser(data){
    return request({
        url:'/api/admin/user/'+data,
        method:'delete',
        data
    })
}
// 获取正常状态下的用户
export function getUserListTrue(){
    return request({
        url:'/api/admin/user/new',
        method:'get',
      
    })
}

/**
 * 角色管理
 * 
 */
// 获取角色列表
export function getRoleList(data){
    return request({
        url:'/api/admin/role/new',
        method:'get',
    })
}
// 获取全部角色列表
export function getRoleListA(data){
    return request({
        url:'/api/admin/role',
        method:'get',
    })
}
// 新加角色
export function createRole(data){
    return request({
        url:'/api/admin/role',
        method:'post',
        data
    })
}
// 根据角色id 获取角色
export function getRole(data){
    return request({
        url:'/api/admin/role/'+data+'/edit',
        method:'get',
    })
}
// 根据角色id 获取角色
export function editRole(id,data){
    return request({
        url:'/api/admin/role/'+id,
        method:'put',
        data
    })
}
// 根据id 删除角色

export function deleteRole(data){
    console.log(data)
    return request({
        url:'/api/admin/role/'+data,
        method:'delete',
    })
}

/**
 * 角色管理
 * 
 */
// 获取权限列表

export function getPermissionListA(data){
    return request({
        url:'/api/admin/permission/new',
        method:'get',
    })
}
export function getPermissionList(data){
    return request({
        url:'/api/admin/permission',
        method:'get',
        params:data
    })
}
// 新加角色
export function createPermission(data){
    return request({
        url:'/api/admin/permission',
        method:'post',
        data
    })
}
// 根据角色id 获取角色
export function getPermission(data){
    return request({
        url:'/api/admin/permission/'+data+'/edit',
        method:'get',
    })
}
// 根据角色id 获取角色
export function editPermission(id,data){
    return request({
        url:'/api/admin/permission/'+id,
        method:'put',
        data
    })
}
// 根据id 删除角色

export function deletePermission(data){
    console.log(data)
    return request({
        url:'/api/admin/permission/'+data,
        method:'delete',
    })
}


/**
 * 学校用户管理
 * 
 */
// 获取教师列表
export function getTeacherList(data){
    return request({
        url:'/api/admin/teacher/new',
        method:'get',
    })
}
// 获取全部教师列表
export function getTeacherListA(data){
    return request({
        url:'/api/admin/teacher',
        method:'get',
        params:data,
    })
}
// 新加教师
export function createTeacher(data){
    return request({
        url:'/api/admin/teacher',
        method:'post',
        data
    })
}
// 根据教师id 获取教师
export function getTeacher(data){
    return request({
        url:'/api/admin/teacher/'+data+'/edit',
        method:'get',
    })
}
// 根据教师id 获取教师
export function editTeacher(id,data){
    return request({
        url:'/api/admin/teacher/'+id,
        method:'put',
        data
    })
}
// 根据id 删除教师

export function deleteTeacher(data){
    return request({
        url:'/api/admin/teacher/'+data,
        method:'delete',
    })
}
/**
 * 
 * @param {故障标签管理} data 
 */

// 获取故障标签列表
export function getTagList(data){
    return request({
        url:'/api/admin/tag/new',
        method:'get',
    })
}
// 获取全部故障标签列表
export function getTagListA(data){
    return request({
        url:'/api/admin/tag',
        method:'get',
        params:data,
    })
}
// 新加故障标签
export function createTag(data){
    return request({
        url:'/api/admin/tag',
        method:'post',
        data
    })
}
// 根据故障标签id 获取故障标签
export function getTag(data){
    return request({
        url:'/api/admin/tag/'+data+'/edit',
        method:'get',
    })
}
// 根据故障标签id 获取故障标签
export function editTag(id,data){
    return request({
        url:'/api/admin/tag/'+id,
        method:'put',
        data
    })
}
// 根据id 删除故障标签

export function deleteTag(data){
    return request({
        url:'/api/admin/tag/'+data,
        method:'delete',
    })
}
/**
 *  获取学校列表
 *  */
export function getSchoolList(){
    return request({
        type:'get',
        url:'/api/admin/schoolList'
    })
}
