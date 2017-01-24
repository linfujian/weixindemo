
var app = getApp(),currentPage=1;
const URL = "https://api.tianapi.com/social/"

Page({
    data:{
        imgUrls:[
                        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        toview:"",
        loadingHidden:true,
        renderData:[],
    },

    onLoad:function(options){
        this.loadDataFromServer();
    },
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

    refresh: function(e){
        currentPage = currentPage>1? --currentPage:1;
        this.loadDataFromServer();
    },

    loadMore: function(e){
        ++currentPage;
        this.loadDataFromServer();
    },

    changeLoadingStatus: function(bool){
        this.setData({
            loadingHidden:bool
        });
    },

    onReady:function(){
        wx.setNavigationBarTitle({
          title: '列表',
        });
    },

    onShow:function(){

    },

    onHide:function(){

    },

    onUnload:function(){
        
    }
});