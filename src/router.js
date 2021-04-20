import { createRouter, createWebHistory } from 'vue-router';

import Authentication from './components/Authentication.vue';
import Capture from './components/Capture.vue';
import ArchiveList from './components/ArchiveList.vue';
import NotFound from './components/NotFound.vue';
import store from './store.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'capture',
      alias: ['/'],
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
      name: 'auth-login',
      path: '/auth-login',
      component: Authentication,
      props: {
        default: true,
        authFlow: 'login'
      },
      meta: {
        authRequired: false
      }
    },
    {
      name: 'auth-create',
      path: '/auth-create',
      component: Authentication,
      props: {
        default: true,
        authFlow: 'create'
      },
      meta: {
        authRequired: false
      }
    },
    {
      name: 'auth-confirm',
      path: '/auth-confirm',
      component: Authentication,
      props: {
        default: true,
        authFlow: 'confirm'
      },
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
  console.log('Route guard:', from.name, '->', to.name);

  if (to.meta.authRequired === false) {
    console.log('auth not required');
    next();
  } else {
    //assume auth required for all other cases
    console.log('auth required');
    if (store.getters.isAuthenticated) {
      console.log('authenticated already!');
      next();
    } else {
      console.log('redirect to auth with fromRoute=', from.name);
      next({
        name: 'auth-login',
        query: {
          fromRoute: from.name
        }
      });
    }
  }
});

export default router;
