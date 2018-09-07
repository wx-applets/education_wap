// pages/myself/class_contact/class_contact.js
const app = getApp()
const utils = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherList: [],
    parentList: [],
    tearchTotal: 0,
    parentTotal: 0,
    showModalStatus: false,
    qrcode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用户
    utils.wxpromisify({
      url: 'user/userTelBook',
      data: {
        token: app.user.token,
        user_id: app.user.user_id,
        class_id: app.user.class_id
      },
      method: 'post'
    }).then((res) => {
      if (res && res.response === 'data') {
        let parentTotal = parseInt(res.list.length)
        this.setData({
          parentList: res.list,
          parentTotal
        })
      } else {
        this.setData({
          parentList: []
        })
      }
    })
  
    //教师
    utils.wxpromisify({
      url: 'user/teaTelBook',
      data: {
        token: app.user.token,
        user_id: app.user.user_id,
        class_id: app.user.class_id
      },
      method: 'post'
    }).then((res) => {
      if (res && res.response === 'data') {
         let tearchTotal = parseInt(res.list.length)
        this.setData({
          teacherList: res.list,
          tearchTotal
        })
      } else {
        this.setData({
          teacherList: []
        })
      }
    })
  this.createqrCode()
  },
  delete(e) {
    let del_user_id = e.currentTarget.dataset.id
    utils.wxpromisify({
      url: 'user/delTel',
      data: {
        token: app.user.token,
        user_id: app.user.user_id,
        class_id: app.user.class_id,
        del_user_id,
      },
      method: 'post'
    }).then((res) => {
      if (res && res.response === 'data') {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        this.onLoad()
      }
    })
  },
  invitTeacher() {
    wx.navigateTo({
      url: '/pages/myself/invit_teacher/invit_teacher'
    })
  },
  //生成二维码
    createqrCode(){
    utils.wxpromisify({
      url: 'index/qrcode',
      data: {
        param: {
          class_id: app.user.class_id
        },
        page: 'pages/myself/join_class/join_class'
      },
      method: "post"
    }).then(res => {
      if(res && res.response === 'data'){
        let qrcode = res.data.qrcode
        this.setData({
           qrcode
        })
      }
    })
  },

  //邀请
  onShareAppMessage: function (e) {
    return {
      title: '邀请您加入班级',
      imageUrl: '/image/xiaohaoge.png',
      path: 'pages/myself/invit_teacher/invit_teacher?handle=invitTeacher&class_id=' + app.user.class_id // 路径，传递参数到指定页面。
    }
  },
  //显示对话框
  showModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).top()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      // animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    // animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      // animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  
  //保存二维码
  savePhotos() {
    let qrcode = this.data.qrcode
    wx.getImageInfo({
      src: qrcode,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: (res) => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(() => {
              this.setData({
                showModalStatus: false
              })
            }, 3000)
          },
          fail: (err) => {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 3000
            })
          }
        })
      }
    })
  },
  callPhone(e) {
    let phone = e.currentTarget.dataset.num
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})
