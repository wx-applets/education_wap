// pages/personData/personData.js
let utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: 'parent',
    relationshipIndex: 0,
    hobbyIndex: 0,
    workIndex: 0,
    date: '请选择出生日期',
    radioCheckVal: 'woman',
    content:{},
    sex_list: [{
        name: 'woman',
        value: '女',
        checked: true
      },
      {
        name: 'man',
        value: '男'
      },
    ],
    Relationship: [{
        num: 0,
        label: '爸爸'
      },
      {
        num: 1,
        label: '妈妈'
      },
      {
        num: 2,

        label: '爷爷'
      },
      {
        num: 3,
        label: '奶奶'
      },
      {
        num: 4,
        label: '外公'
      },
      {
        num: 5,
        label: '外婆'
      },
      {
        num: 6,
        label: '其他'
      }
    ],
    hobby: [{
        num: 0,
        label: '游泳'
      },
      {
        num: 1,
        label: '跳舞'
      },
      {
        num: 2,

        label: '厨艺'
      },
      {
        num: 3,
        label: '钓鱼'
      },
      {
        num: 4,
        label: '跑步'
      },
      {
        num: 5,
        label: '电影'
      },
      {
        num: 6,
        label: '其他'
      }
    ],
    workItem: [{
        num: 0,
        label: '英语'
      },
      {
        num: 1,
        label: '语文'
      },
      {
        num: 2,
        label: '数学'
      },
      {
        num: 3,
        label: '化学'
      },
      {
        num: 4,
        label: '物理'
      }, {
        num: 5,
        label: '其他'
      }
    ],
    storage:{}
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  switchShip(e) {
    let num = e.currentTarget.dataset.num
    this.setData({
      relationship: num
    })
  },
  switchHobby(e) {
    let num = e.currentTarget.dataset.num
    this.setData({
      hobbyIndex: num
    })
  },
  switchWork(e) {
    let num = e.currentTarget.dataset.num
    this.setData({
      workIndex: num
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var params = {
      user_id: wx.getStorageSync('userInfo').user_id,
      token: wx.getStorageSync('userInfo').token,
      class_id: wx.getStorageSync('class_id'),
    }
    this.setData({storage: params})
    let url = this.data.role === 'teacher' ? 'user/userInfoTea' : 'user/userInfo'
    utils.wxpromisify({
      url: url,
      data: params,
      method: 'post'
    }).then((res) => {
      if (res && res.response === 'data') {
          let content = this.data.content
          content.nickname = res.data.username
          content.birth = res.data.birthday
      }
    }).catch((err) => {
      console.log(err)
    })

  },
  getPhoneNumber() {

  },
  formSubmit(e) {
      let selPerVal = {
          user_id:'',
          token:'',
          mobile:'',
          child_name:'',
          child_sex:'',
          child_birth:'',
          family_role:'',
          family_role_name:'',
          like_id:'',
          other_like:''
      }
      let selTeaVal = {
          user_id:'',
          token:'',
          username:'',
          gender:'',
          birthday:'',
          subject_type:'',
          subject_name:''
      }
    // let descript = e.detail.value.descript.trim()
    
    // if (!descript) {
    //   wx.showToast({
    //     title: '请输入文字描述',
    //     icon: 'none',
    //     duration: 5000
    //   })
    //   return
    // }
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

  }
})
