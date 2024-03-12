/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
//@ts-ignore
import index from '@/pages/index.vue';
import login from '@/pages/login.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: index,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      component: login,
  }
  ]
});

//@ts-ignore
/*router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('requiresAuth');
    const token = localStorage.getItem('token');
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});*/

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  console.log('beforeEach');
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.token) {
    //auth.returnUrl = to.fullPath;
    next('/login');
  }
  next();
});

export default router;

