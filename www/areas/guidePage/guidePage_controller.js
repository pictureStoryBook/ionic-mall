// guidePage页面业务逻辑
// 页面功能：引导页功能          创建日期：2020.23.23
// 创建者：张三                 修改日期：2020.3.46
angular.module('guidePage.controller', ['guidePage.service'])
  .controller('GuidePageCtrl',function ($scope,$state) {

    //引导页slide初始化
    var guideSlide = new Swiper('#guideSlide', {
      pagination: '.swiper-pagination',
      onSlideChangeEnd: function(swiper){
        var activeIndex = guideSlide.activeIndex;
        $('.animate').each(function(index){
          if(activeIndex == index){
            $(this).removeClass('hidden').addClass('guide-show')
          }else{
            $(this).removeClass('guide-show').addClass('hidden')
          }
        })

      }
    });


    $scope.func_goHome=function(){
      localStorage["isFirst"]=true;
      $state.go('tab.home');
    }

  })
