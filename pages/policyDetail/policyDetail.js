// pages/policydetail/policydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: null,
    navigateTitle: "",
    article: "",
    shareUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    that.shareUrl = 'pages/policyDetail/policyDetail?id=' + options.id + '&addr=' +
      options.addr + '&source=' + options.source + '&title=' + options.title;
    that.navigateTitle = options.title;
    var id = options.id;
    var addr = options.addr;
    var source = options.source;
    var url = 'https://appweb.techhg.com/granoti/infohttps?id=' + options.id + '&addr=' + options.addr + '&source=' + options.source + '&isHttps=1'
    this.setData({
      navigateTitle: options.title,
      path: encodeURI(url)
    })
    console.log("url---" + encodeURI(url));
    console.log("详情标题：" + this.data.navigateTitle );
    wx.setNavigationBarTitle({
      title: options.title,
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: that.navigateTitle,
      path: that.shareUrl,
      success: function (res) {
        // 
        console.log("path:" + that.shareUrl);
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
    }
  }
})