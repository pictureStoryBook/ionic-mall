//home路由是tab抽象路由中的子路由
angular.module('home.route', ['home.controller'])
  .config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
      //因为再tab抽象路由中的名称时tab，这里是抽象路由下的子路由
      .state('tab.home', {
        //抽象路由会把这个子路由拼接起来
        url: '/home',
        //从这里来对应tab页面中应该渲染的页面
        views: {
          //tab-home和tab页面中的name 属性对应
          'tab-home': {
            templateUrl: 'areas/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })

  });
