
angular.module('tab.route', ['tab.controller'])
  //$stateProvider 定义路由用的服务
  //$urlRouterProvider 路由跳转用的服务
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,//抽象路由：不会被单独渲染，只有配合其子路由才能起作用
        templateUrl: 'areas/tab/tab.html',
        controller: 'TabCtrl'
      })

  });
