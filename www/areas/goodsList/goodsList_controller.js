// 商品列表页面
angular.module('goodsList.controller', ['goodsList.service'])
  .controller('GoodsListCtrl', function ($scope,$stateParams,GoodsListFty,$ionicLoading,$ionicHistory) {


    // 和前台绑定的数据对象
    $scope.obj_goodsListData = [];
    // 控制是否有更多数据可以加载
    $scope.pms_isMoreItemsAvailable=true;
    // 分页查询对象
    $scope.obj_pagingInfo = {
      amountMax: "",
      amountMin: "",
      billNum: "",
      createUser: "",
      dateFrom: "",
      dateTo: "",
      deptID: "",
      deptName: "",
      keyWord: "",
      loginName: "",
      billType: "",
      pageNum: 1,
      pageSize: 10,
      sortFlag: "0",
      sortType: "desc",
      typeNumber:""
    };

    // 视图事件
    $scope.$on('$ionicView.beforeEnter', function (e) {
      $scope.func_refreshGoodsList();
    });


    // 下拉刷新的方法
    $scope.func_refreshGoodsList=function(){
      $scope.obj_pagingInfo.pageNum=1;
      // 给商品类别赋值
      $scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;
      var message=JSON.stringify($scope.obj_pagingInfo);

      // 刷新列表数据
      var promise=GoodsListFty.refreshGoodsList(message);
      promise.then(
        //成功的回调函数
        function(data){
          // 为了代码健壮性做判断
          if(data){
            $scope.obj_goodsListData=data;
            $scope.pms_isMoreItemsAvailable=true;
          }
          else{
            $scope.pms_isMoreItemsAvailable=false;
          }
        },
        //失败的回调函数
        function(reason){
          console.log(reason);
        }
        //最后广播一下
      ).finally(function(){
        // 停止广播ion-refresher
        $scope.$broadcast('scroll.refreshComplete');
      });

    }

    // 上拉加载更多数据的方法
    $scope.func_loadMoreGoodsList=function(){
      console.log(2);
      // 显示遮罩层
      $ionicLoading.show({
        template: '正在加载数据.....'
      });

      // 参数信息
      $scope.obj_pagingInfo.pageNum++;
      $scope.obj_pagingInfo.typeNumber=$stateParams.typeNumber;
      var message=JSON.stringify($scope.obj_pagingInfo);

      // 请求数据
      var promise = GoodsListFty.loadMoreGoodsList(message);
      promise.then(
        function (data) {
          // 为了代码健壮性做判断
          if (data) {
            $.each(data, function (i, item) {
              $scope.obj_goodsListData.push(item);
            });
            $scope.pms_isMoreItemsAvailable=true;
          }
          else {
            $scope.pms_isMoreItemsAvailable=false;
          }
        },
        function (reason) {
          console.log(reason);
        }
      ).finally(function() {

        setTimeout(function(){
          //关闭遮罩层
          $ionicLoading.hide();
        },2000)

        // 停止加载更多的广播
        $scope.$broadcast('scroll.infiniteScrollComplete');

      });;
    }


    //返回前一页面方法
    $scope.func_goBack=function(){
      $ionicHistory.goBack();
    }



























    // promise规范执行顺序演示
    //console.log(1);
    //var promise=GoodsListFty.request();
    //promise.then(
    //  // 成功的回调函数
    //  function(data){
    //    console.log(5);
    //    return data;
    //    //A操作
    //  },
    //  // 失败的回调函数
    //  function(reason){
    //    console.log(6);
    //  }
    //).then(
    //  function(data){
    //    console.log(7);
    //    //B操作
    //    console.log(data);
    //  }
    //).finally(function(){
    //  console.log(8);
    //})
    //
    //console.log(9);



    // ES6中Promise的用法
    //function func_promise(){
    //  var  promise = new Promise(function(resolve, reject) {
    //    console.log('Promise');
    //    resolve();
    //  });
    //  return promise;
    //}
    //
    //
    //var promise1=func_promise();
    //promise1.then(function(){
    //
    //},function(){
    //
    //})


    //ES7里面的异步解决方案
    //var asyncReadFile = async function (){
    //  var f1 = await readFile('/etc/fstab');
    //  var f2 = await readFile('/etc/shells');
    //  console.log(f1.toString());
    //  console.log(f2.toString());
    //};
    //
    //asyncReadFile();



  })
