// pages/caseProgress/caseProgress.js
var page = 1, totalNum = 0;
var keyswords = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    isHide: true,
    navigateTitle: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.keyswords != '') {
      keyswords = options.keyswords;
    }
    that.data.navigateTitle = options.title,
      wx.setNavigationBarTitle({
        title: that.data.navigateTitle
      })
      if(keyswords!=''){
          page = 1;
        this.loadData();
      }
  },
  search: function (e) {
    console.log(e.detail.value),
      keyswords = e.detail.value.toUpperCase();
    if (keyswords.includes('ZL')) {
        keyswords = keyswords.replace('ZL','CN')
      }
    page = 1;
    this.loadData();
  },
  loadData: function () {
    let that = this;
    this.showLoading();
    wx.request({
      method: 'GET',
      data: {
        pageNo: page,
        keyswords: "DATABASE:(CHN) AND ALL:(" + keyswords + ")",
      },
      url: 'https://appweb.techhg.com/patent/queryList',
      success: function (res) {
        console.log(res.data);
        that.setData({
          dataList: res.data.body.content,
          totalNum: res.data.body.total,
          isHide: false
        })
        that.cancelLoading();
      }
    })
  },
  loadMoreData: function () {
    page++;
    let that = this;
    this.showLoading();
    wx.request({
      method: 'GET',
      data: {
        pageNo: page,
        keyswords: "DATABASE:(CHN) AND ALL:(" + keyswords + ")",
      },
      url: 'https://appweb.techhg.com/patent/queryList',
      success: function (res) {
        console.log(res.data);
        that.setData({
          dataList: that.data.dataList.concat(res.data.body.content),
          totalNum: res.data.body.total,
          isHide: false
        })
        that.cancelLoading();
      }
    })
  },
  showLoading: function () {
    wx.showLoading({
      title: '加载中',
    })
  },
  cancelLoading: function () {
    wx.hideLoading();
    wx.stopPullDownRefresh(); //停止下拉刷新
  },
  // 用户自定义事件
  tableViewItemClick: function (e) {
    let that = this;
    if (wx.canIUse('web-view')) {
      wx.navigateTo({
        url: that.data.navigateTitle == '专利检索' ? ('../patentDetail/patentDetail?id=' + e.currentTarget.dataset.id + ' &pkinds=' + e.currentTarget.dataset.pkinds + '&physicdb=' + e.currentTarget.dataset.physicdb + '&title=' + e.currentTarget.dataset.title) + '&urltype=0'
          : ('../patentDetail/patentDetail?an=' + e.currentTarget.dataset.an + ' &apn=' +
            e.currentTarget.dataset.apn + '&title=' + e.currentTarget.dataset.title + '&pn=' + e.currentTarget.dataset.pn + '&urltype=1')
      })
    } else {
      wx.showToast({
        title: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
      })

    }

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
    page = 1;
    if (keyswords == '') {
      wx.showToast({
        title: '关键词不能为空',
      })
    } else {
      this.loadData();
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: that.data.navigateTitle,
      path: 'pages/searchPatent/searchPatent?keyswords=' + keyswords + '&title=' + that.data.navigateTitle,
      
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