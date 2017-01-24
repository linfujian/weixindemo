App({
    onLaunch:function(){
        this.getUserInfo();
    },
    getUserInfo:function(cb){
        var that = this;
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo)
        }else{
            wx.login({
                success:function(){
                    wx.getUserInfo({
                      success: function(res){
                        that.globalData.userInfo = res.userInfo;
                        typeof cb == "function" && cb(that.globalData.userInfo);
                      }
                      })
                }
            });
        }
    },

    req:function(url,data,param){
        var requestData = {
            url:url,
            data:typeof data == 'object'?data:{},
            method:typeof param == 'string' && param.method.length>0?param.method.toUpperCase():'GET',
            header:typeof param.header == 'object'? param.header:{},
            success:function(res){
                typeof param.success == 'function' &&param.success(res);
            },
        };
        wx.request(requestData);
    },
    globalData:{
        userInfo:null,
        apikey:"f669dfe0a4154ffebe41572fd4cce38a",
    }
})