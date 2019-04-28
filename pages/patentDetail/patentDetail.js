// pages/patentDetail/patentDetail.js
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
    that.shareUrl = options.urltype == 0 ? ('pages/patentDetail/patentDetail?id=' + options.id + ' &pkinds=' + options.pkinds + '&physicdb=' + options.physicdb + '&title=' + options.title + '&urltype=0') : ('pages/patentDetail/patentDetail?an=' + options.an + ' &apn=' +
      options.apn + '&title=' + options.title + '&pn=' + options.pn + '&urltype=1');
    that.navigateTitle = options.title;

    this.setData({
      navigateTitle: options.title,
      path: options.urltype == 0 ? encodeURI('https://appweb.techhg.com/patent/info?app=1&techId=' + options.id + '&PKIND_S=' + options.pkinds + '&PHYSIC_DB=' + options.physicdb + '&isXiao=1') :
        encodeURI('https://appweb.techhg.com/patent/gradeCore?app=1&AN=' + options.an + '&APN=' + options.apn + '&patentName=' + options.title + '&PN=' + options.pn + '&isXiao=1')
    })
    console.log("url---" + this.data.path);
    console.log("详情标题：" + this.data.navigateTitle);

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