import { createRouter, createWebHashHistory } from 'vue-router'
import IconBookmark from '~components/icon/IconBookmark.vue'
import IconTab from '~components/icon/IconTab.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/check',
      name: 'check',
      component: () => import('../pages/Check.vue'),
      meta: {
        icon: IconBookmark,
        title: 'Check'
      }
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: () => import('../pages/Tabs.vue'),
      meta: {
        icon: IconTab,
        title: 'Tabs'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ name: 'check' })
  }
  next()
})

export default router
