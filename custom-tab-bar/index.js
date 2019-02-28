Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    selected: 0,
    list: [{
        pagePath: "../index/index",
        iconPath: "/images/tabbar/basics.png",
        selectedIconPath: "/images/tabbar/basics_cur.png",
        text: "问答"
      },
      {
        pagePath: "../chat/chat",
        iconPath: "/images/tabbar/component.png",
        selectedIconPath: "/images/tabbar/component_cur.png",
        text: "聊天"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset   
      const url = e.currentTarget.dataset.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  },
  pageLifetimes: {
  },
})