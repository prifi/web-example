import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/usercenter',
    component: Layout,
    name: '??????????????????',
    meta: { title: '??????????????????', icon: 'user' },
    children: [
      {
        path: 'user',
        name: '????????????',
        component: () => import('@/views/usercenter/user/index'),
        meta: { title: '????????????', icon: 'user' }
      },
      {
        path: 'group',
        name: '????????????',
        component: () => import('@/views/usercenter/group/index'),
        meta: { title: '????????????', icon: 'tree' }
      }
    ]
  },

  {
    path: '/project',
    component: Layout,
    name: '????????????',
    meta: { title: '????????????', icon: 'code' },
    children: [
      {
        path: 'project',
        name: '????????????',
        component: () => import('@/views/project/project/index'),
        meta: { title: '????????????', icon: 'user' }
      }
    ]
  },
  {
    path: '/release',
    component: Layout,
    name: '????????????',
    meta: { title: '????????????', icon: 'user' },
    children: [
      {
        path: 'apply',
        name: '????????????',
        component: () => import('@/views/release/apply/index'),
        meta: { title: '????????????', icon: 'user' }
      },
      {
        path: 'list',
        name: '????????????',
        component: () => import('@/views/release/list/index'),
        meta: { title: '????????????', icon: 'tree' }
      },
      {
        path: 'history',
        name: '????????????',
        component: () => import('@/views/release/history/index'),
        meta: { title: '????????????', icon: 'tree' }
      }
    ]
  },

  {
    path: '/workorder',
    component: Layout,
    name: '????????????',
    meta: { title: '????????????', icon: 'form' },
    children: [
      {
        path: 'apply',
        name: '????????????',
        component: () => import('@/views/workorder/apply/index'),
        meta: { title: '????????????', icon: 'form' }
      },
      {
        path: 'list',
        name: '????????????',
        component: () => import('@/views/workorder/list/index'),
        meta: { title: '????????????', icon: 'table' }
      },
      {
        path: 'history',
        name: '????????????',
        component: () => import('@/views/workorder/history/index'),
        meta: { title: '????????????', icon: 'table' }
      }
    ]
  },

  {
    path: '/tasks',
    component: Layout,
    name: '????????????',
    meta: { title: '????????????', icon: 'tree' },
    children: [
      {
        path: 'add',
        name: '????????????',
        component: () => import('@/views/tasks/add/index'),
        meta: { title: '????????????', icon: 'form' }
      },
      {
        path: 'list',
        name: '????????????',
        component: () => import('@/views/tasks/list/index'),
        meta: { title: '????????????', icon: 'table' }
      }
    ]
  },

  {
    path: '/books',
    component: Layout,
    redirect: '/example/table',
    name: '??????????????????',
    meta: { title: '??????????????????', icon: 'example' },
    children: [
      {
        path: 'book',
        name: '??????',
        component: () => import('@/views/books/book/index'),
        meta: { title: '??????', icon: 'table' }
      },
      {
        path: 'author',
        name: '??????',
        perms: 'books.add_author',
        component: () => import('@/views/books/author/index'),
        meta: { title: '??????', icon: 'tree' }
      },
      {
        path: 'publish',
        name: '?????????',
        component: () => import('@/views/books/publish/index'),
        meta: { title: '?????????', icon: 'table' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //??????????????????
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
