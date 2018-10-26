import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/index'
import Login from '@/pages/login/index'
import ResetPassword from '@/pages/resetPassword/index'
import NewPassword from '@/pages/newPassword/index'
import Register from '@/pages/register/index'
import Submission from '@/pages/author/submission'
import Finished from '@/pages/author/finished'
import Unfinished from '@/pages/author/unfinished'
import ReviewTask from '@/pages/review/reviewTask'
import DetailReview from '@/pages/detailReview/index'
import ConfirmSubmission from '@/pages/ConfirmSubmission/index'
import Notice from '@/pages/webMastor/notice'
import Release from '@/pages/webMastor/release'
import Distribution from '@/pages/editor/distribution'
import UpdateRole from '@/pages/administrator/updateRole'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/author/submission',
      name: 'submission',
      component: Submission,
      meta: {
        keepAlive:true, 
        isBack:false,
        requireAuth: true
      }
    },
    {
      path: '/author/finished',
      name: 'finished',
      component: Finished,
      meta: {
        // keepAlive: true, //此组件需要被缓存
        // isBack:false,
        requireAuth: true
      }
    },
    {
      path: '/author/unfinished',
      name: 'unfinished',
      component: Unfinished,
      meta: {
        // keepAlive: true, //此组件需要被缓存
        // isBack:false,
        requireAuth: true
      }
    },
    {
      path: '/review/reviewTask',
      name: 'reviewTask',
      component: ReviewTask,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/newPassword',
      name: 'newPassword',
      component: NewPassword
    },
    {
      path: '/detailReview',
      name: 'detailReview',
      component: DetailReview,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/confirmSubmission',
      name: 'confirmSubmission',
      component: ConfirmSubmission,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/webMastor/notice',
      name: 'notice',
      component: Notice,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/webMastor/release',
      name: 'release',
      component: Release,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/editor/distribution',
      name: 'distribution',
      component: Distribution,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/administrator/updateRole',
      name: 'updateRole',
      component: UpdateRole,
      meta: {
        requireAuth: true
      }
    }
  ]
})
