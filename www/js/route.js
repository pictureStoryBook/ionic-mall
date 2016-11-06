
angular.module('route', [
  'guidePage.route',
  'tab.route',
  'home.route',
  'category.route',
  'goodsList.route',
  'details.route',
  'cart.route',
  'account.route'
])
  .config(function($stateProvider, $urlRouterProvider) {

    // 第一次登陆
    if(localStorage["isFirst"])
    {
      //关于ui-router的使用可以到github官网上根着它的案例走一遍
      $urlRouterProvider.otherwise('/tab/home');
    }
    else {
      $urlRouterProvider.otherwise('/guidePage');
    }

  });
