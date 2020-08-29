import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    // route('/','/index','index'),  
    // routePage("/index",'/index',"index"),
    {
      path: "/",
      component: () => import('../pages/index'),
      // children 的component会被渲染到父组件的 <router-view> </router-view> 中
      children: [
      
      ]
    }
  ]
})

// function route(path, file, name, children) {
//   return {
//     exact: true,
//     path,
//     name,
//     children,
//     component: () => import('../components' + file)
//   }
// }

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  // function routePage (path, file, name, children) {
  //   return {
  //     exact: true,
  //     path,
  //     name,
  //     children,
  //     component: () => import('../pages' + file)
  //   }
  // }
