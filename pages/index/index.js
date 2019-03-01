//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    answer: '',
    question: '',
    isShow: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    elements: [
    // {
    //   title: '孙悟空',
    //   name: 'layout',
    //   color: 'cyan',
    //   icon: 'newsfill'
    // },
    // {
    //   title: '唐僧',
    //   name: 'background',
    //   color: 'blue',
    //   icon: 'colorlens'
    // },
    // {
    //   title: '西游记',
    //   name: 'text',
    //   color: 'purple',
    //   icon: 'font'
    // },
    // {
    //   title: '师徒',
    //   name: 'icon',
    //   color: 'mauve',
    //   icon: 'icon'
    // }
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      enity: {
        name: e.currentTarget.dataset.title
      }
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  questionInput: function (e) {
    this.setData({
      question: e.detail.value
    })
  },
  searchAnswer() {
    if(this.data.question != ''){
      var that = this
      // console.log(this.data.question)
      wx.request({
        url: 'http://192.168.3.40:9999/question/',
        method: 'POST',
        data: {
          question: this.data.question
        },
        success(res) {
          // console.log(res.data)
          // enitylist = []
          // if(res.data.enity.length > 0){
          //   for(x in res.data.enity){
          //     console.log(res.data.enity[x])
          //     this.enitylist.push({
          //       title: enity,
          //       color: 'cyan',
          //     })
          //   }
          // }
          // console.log(this.enitylist)
          that.setData({
            isShow: false,
            answer: res.data.answer,
            elements: res.data.elements
          })
        }
      })
    }
  }
})
