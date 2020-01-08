import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store/index.js'

Vue.use(Router)

// export default new Router({
//     routes: [{
//             path: '/',
//             name: 'HelloWorld',
//             component: HelloWorld
//         },
//         {
//             path: '/login',
//             name: 'login',
//             component: () =>
//                 import ('@/pages/login/index'),
//         },
//         {
//             path: '/home',
//             name: 'home',
//             component: () =>
//                 import ('@/pages/home/index'),
//         }
//     ],

// })
const router = new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            meta: { requireAuth: false },
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/pages/login/index'),
            meta: { requireAuth: false },
        },
        {
            path: '/home',
            name: 'home',
            component: () =>
                import ('@/pages/home/index'),
            meta: { requireAuth: true },
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: () =>
                import ('@/pages/recommend/index'),
            meta: { requireAuth: true },
        },
        {
            path: '/play/',
            name: 'play',
            component: () =>
                import ('@/pages/play/index'),
            meta: { requireAuth: false },
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import ('@/pages/profile/index'),
            meta: { requireAuth: true },
        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ('@/pages/search/index'),
            meta: { requireAuth: false },
        },
        {
            path: '/songlist',
            name: 'songlist',
            component: () =>
                import ('@/pages/songlist/index'),
            meta: { requireAuth: false },
        },
        {
            path: '/singer',
            name: 'singer',
            component: () =>
                import ('@/pages/singer/index'),
            meta: { requireAuth: false },
        },
        {
            path: '/singerSong',
            name: 'singerSong',
            component: () =>
                import ('@/pages/singerSong/index'),
            meta: { requireAuth: false },
        },
        {
            path: '/rank',
            name: 'rank',
            component: () =>
                import ('@/pages/rank/index'),
            meta: { requireAuth: false },
        },
        {
            path: '/radio',
            name: 'rank',
            component: () =>
                import ('@/pages/radio/index'),
            meta: { requireAuth: false },
        }

    ],
})
router.beforeEach(async(to, from, next) => {
    const token = await localStorage.getItem('userInfo')
        // const tokenExpire = await sessionStorage.getItem('token_expire')
        // debugger
        // console.log('router', to.fullPath, to.path)
        // console.log(token)
    if (token) {
        // token有效，且在有效期内
        // let tmr = setTimeout(() => {
        //  // $loading.show('加载中...')
        // }, 300)
        try {
            // 获取用户信息
            await store.commit('storeUserInfo', JSON.parse(token))
                // 获取过户待审数
                // await store.dispatch('getTrfAuditCount')
                // 获取提货待审数
                // await store.dispatch('getStoAuditCount')
                // clearTimeout(tmr)
                // $loading.hide()

            // 检查是否有访问权限
            // if (to.matched.some(r => r.meta.requireRole == 'admin')) {
            //   // if(Auth.hasAuth(to.path)) {
            //   if (Auth.isAdmin()) {
            //     next()
            //   } else {
            //     await store.dispatch('logout')
            //     next('/login')
            //   }
            // } else {
            //   next()
            // }
        } catch (err) {
            console.log(err)
            next({
                path: '/login',

            })
        }
    }
    if (to.matched.some(r => r.meta.requireAuth) && !token) {
        next({
            path: '/login',

        })
    } else {
        // 不需要身份验证
        next()
    }
})
export default router