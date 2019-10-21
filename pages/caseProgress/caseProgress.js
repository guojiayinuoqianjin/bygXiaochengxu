// pages/caseProgress/caseProgress.js
var keyswords = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    isHide : true,
    isHideImg: false,
    caseRefer : '',
    navigateTitle : '案件进度查询'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.keyswords != '') {
      keyswords = options.keyswords;
    }
    //TODO
   // keyswords = "111";
    //this.loadData();
      
  },
  search: function (e) {
    keyswords = e.detail.value;
    console.log(keyswords );
    if (keyswords != ''){
      this.loadData();
    }else{
      wx.showToast({
        title: '请输入案号',
        duration : 2000,
        icon : 'none'
      })
    }
   
  },
  loadData: function () {
    let that = this;
    this.showLoading();
    wx.request({
      method: 'GET',
      data: {
        caseRefer: keyswords,
        usrId : ""
      },
      url: 'http://192.168.1.97:8080/case/queryCaseState',
      success: function (res) {
        console.log(res.data);
        var result = res.data.body;
       
        if (result.length != 0 ){
          that.setData({
            dataList: res.data.body,
            isHide: false,
            isHideImg: true,
            caseRefer: keyswords
          })
        }else{
          that.setData({
            dataList: '',
            isHide: true,
            isHideImg: false,
            caseRefer: keyswords
          })
          wx.showToast({
            title: '请输入正确的案号',
            duration: 2000,
            icon: 'none'
          })
        }
        wx.hideLoading();
      }
    })
  },
  showLoading: function () {
    wx.showLoading({
      title: '加载中'
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: that.data.navigateTitle,
      path: 'pages/caseProgress/caseProgress?caseRefer=' + keyswords + '&title=' + that.data.navigateTitle,
      
      success: function (res) {
        // 
        console.log("navigateTitle:" + that.data.navigateTitle);
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
  }}
})