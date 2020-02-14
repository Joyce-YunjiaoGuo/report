import Vue from 'vue';
import Router from 'vue-router';
import Index from '../components/Index/Index';
import NotFound from '../components/NotFound';
import Login from '../components/Login/LoginPage';
import Search from '../components/Search/Search';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLogin = Boolean(localStorage.token);
  console.log(to);
  if (to.path === '/login') {
    console.log('login');
    next();
  } else {
    if (isLogin) {
      next();
    } else {
      next('/login');
    }
  }
});

export default router;
