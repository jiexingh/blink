// pages/classic/classic.js
import {
  ClassModel
} from '../../models/classic.js';
import {
  LikeModel
} from '../../models/like.js';


let classModel = new ClassModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classData: null,
    latest: true,
    first: false,
    likeCount:0,
    likeStautus:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classModel.getLatest((res) => {
      console.log(res);
      this.setData({
        classData: res,
        likeCount:res.fav_nums,
        like_status:res.like_status,
      });
    });
  },

  onLike: function(e) {
    let behavior = e.detail.behavior;
    likeModel.like(behavior, this.data.classData.id, this.data.classData.type);
  },

  //  获取下一期
  onNext: function(event) {
    this._updateClassic('next');
  },

  // 获取上一期
  onPrevious: function(event) {
    // let index = this.data.classData.index;
    this._updateClassic('previous');
    // classModel.getclassic(index, 'previous', (res) => {
    //   console.log(res);
    //   this.setData({
    //     classData: res,
    //     latest: classModel.isLatest(res.index),
    //     first: classModel.isFist(res.index)
    //   });
    // });
    // console.log(event);
  },

  // 获取classic数据
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classData.index;
    classModel.getclassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type);
      this.setData({
        classData: res,
        latest: classModel.isLatest(res.index),
        first: classModel.isFist(res.index)
      });
    });
  },

  _getLikeStatus:function(artId,categary){
    likeModel.getClassicLikeStatus(artId,categary,(res)=>{
      this.setData({
        likeStautus:res.like_status,
        likeCount:res.fav_nums,
      });
    });
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