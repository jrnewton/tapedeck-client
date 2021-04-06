import { createRouter, createWebHistory } from 'vue-router';

import Authentication from './components/Authentication.vue';
import Capture from './components/Capture.vue';
import ArchiveList from './components/ArchiveList.vue';
import NotFound from './components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'root',
      path: '/',
      component: Capture,
      meta: {
        authRequired: false
      }
    },
    {
      name: 'capture',
      path: '/capture',
      component: Capture,
      meta: {
        authRequired: true
      }
    },
    {
      name: 'archives',
      path: '/archives',
      component: ArchiveList,
      meta: {
        authRequired: true
      }
    },
    {
      name: 'auth',
      path: '/auth',
      component: Authentication,
      meta: {
        authRequired: false
      }
    },
    {
      name: 'auth-confirm',
      path: '/auth-confirm',
      component: Authentication,
      meta: {
        authRequired: false
      }
    },
    {
      name: 'not-found',
      //pass regex to variable
      path: '/:notFound(.*)',
      // this will go to default unamed router view in App.vue
      component: NotFound,
      meta: {
        authRequired: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log('Route guard / global / beforeEach');

  if (to.meta.authRequired === false) {
    next();
  } else {
    //assume auth required for all other cases
    next({
      name: 'auth',
      query: {
        fromRoute: from.name
      }
    });
  }
});

export default router;
