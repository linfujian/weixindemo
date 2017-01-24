# weixindemo
jinritoutiao
# weixinddemo
jiritoutiao
本demo主要调用了https://api.tianapi.com/social/的api接口，需要申请apikey，将其定义在app.js中，请求中的url格式为https://api.tianapi.com/social/?key=yourKey&num=10&currentPage=X

//api读取数据数据

    loadDataFromServer: function(){
        var that = this;
        that.changeLoadingStatus(false);
        app.req(URL,{
            key:app.globalData.apikey,
            num:10,
            page:currentPage,
        },{
            success:function(resp){
                console.log(resp);
                console.log("成功加载页数" + currentPage);
                var tempData = resp.data.newslist;
                var toViewId = currentPage % 2 ==0?         "top-id":"top-id2";
                that.setData({
                    renderData: tempData,
                    toView: toViewId,
                });
                that.changeLoadingStatus(true);
            }
        });
    },
    
    每次上拉调用refresh函数：当前页面减一，下拉调用loadMore函数：当前页面加一，定义在index.js中：
    refresh: function(e){
        currentPage = currentPage>1? --currentPage:1;
        this.loadDataFromServer();
    },

    loadMore: function(e){
        ++currentPage;
        this.loadDataFromServer();
    },
    
    除此之外，需要注意的还有flash页面跳转到首页时的setTimeout函数：因为跳转到tabBar的页面中，所以不能用redirectTo和navigateTo，只能用swithTab：
    
    var timestamp = new Date().getTime();
        setTimeout(function(){
            wx.switchTab({
              url: '../index/index'
            });
          },duration*2.5);
          
   index.wxml的view中：
    <scroll-view scroll-y="true" style="height:100vh;" scroll-into-view="{{toView}}" upper-threshold="5" 
      lower-threshold="5" bindscrolltoupper="refresh" bindscrolltolower="loadMore">
  其中style="height:100vh;" 不能用100%，后者没有refresh和loadMore的效果。
  
  
  
    
