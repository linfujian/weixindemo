
let app = getApp();
let page = {
    data:{
        userInfo:null,
    },
    onLoad: function(options){
        this.setData({
            userInfo:app.globalData.userInfo,
        });
        console.log(this.data,userInfo);
    },
    onReady:function(){

    },
    onShow:function(){

    },
    onHide:function(){

    },
    onUnload:function(){

    }
};

Page(page);