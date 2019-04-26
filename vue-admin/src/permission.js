import router from './router'
import store from './store'
import { getToken } from './utils/auth'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    // console.log(`to---->${JSON.stringify(to)}`)
    // console.log(`from---->${JSON.stringify(from)}`)
    if (getToken()) {
        //console.log(!store.getters.roleId)
        if (to.path == '/login') {
            next({ path: '/' })
        } else if (!store.getters.roleId) {
            store.dispatch('GetUserInfo').then((res) => {
                    store.dispatch('GererateRouter',res).then(res =>{
                        router.addRoutes(store.getters.routers)
                    })
                next({...to})
            })
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) != -1) {
            next()
        } else {
            next({ path: '/login' })
        }

    }
})



