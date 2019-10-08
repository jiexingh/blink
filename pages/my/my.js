// pages/my/my.js
import {
  BookModel
} from '../../models/book.js';
import {
  promisic
} from '../../utils/common.js'

import {
  ClassModel
} from '../../models/classic.js';

const classicModel = new ClassModel();
const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized();
    // this.userAuthorized2();
    this.getMyBookCount();
    this.getMyFavor();
  },

  // async和await获取授权
  async userAuthorizedAs() {
   const data= await promisic(wx.getSetting)()
   console.log(data)
    if (data.authSetting['scope.userInfo']) {
      const res= promisic(wx.getSetting)();
      console.log(res)
      const usetInfo = res.userInfo;
      this.setData({
        authorized: true,
        userInfo
      });
    }
  },


  async userAuthorized2() {
    const data = await promisic(wx.getSetting)()
    if (data.authSetting['scope.userInfo']) {
      const res = await promisic(wx.getUserInfo)()
      const userInfo = res.userInfo
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },




  userAuthorized() {
    wx: wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            lang: '',
            success: (res) => {
              console.log(res);
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              });
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: (res) => {},
      complete: function(res) {},
    })
  },

  getUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      console.log(userInfo);
      this.setData({
        userInfo,
        authorized: true,
      });
    }
  },

  onJumpToAbout() {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        console.log(res);
        this.setData({
          bookCount: res.count
        });
      });
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      console.log(res);
      this.setData({
        classics: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})