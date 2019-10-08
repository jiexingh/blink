// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js';
import {
  LikeModel
} from '../../models/like.js';
const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookdetail: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading();
    const bid = options.bid;

    const bookdetail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);


    // Promise 并行->返回一个新的promise 相当于三个的合体->以下三种的合体
    Promise.all([bookdetail, comments, likeStatus])
      .then(res => {
        console.log('promise all');
        console.log(res);
        this.setData({
          bookdetail: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums,
        });
        wx.hideLoading();
      })

    // //  promise 用法
    // bookdetail.then((res) => {
    //   console.log(res);
    //   this.setData({
    //     bookdetail: res
    //   });
    // });

    // comments.then((res) => {
    //   console.log(res);
    //   this.setData({
    //     comments: res.comments
    //   });
    // });

    // likeStatus.then((res) => {
    //   console.log(res);
    //   this.setData({
    //     likeStatus: res
    //   });
    // });
    // 不一定知道已完成
    // wx.hideLoading();

  },


  // 点赞
  onlike(event) {
    console.log(event);
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel, this.data.bookdetail.id, 400);
  },
  // 输入面板
  onFakePost() {
    this.setData({
      posting: true
    });
  },
  // 面板取消
  onCancel() {
    this.setData({
      posting: false
    });
  },
  // 标签户或者输入框发送来的文本
  onTagPost(event) {
    console.log(event);
    const comment = event.detail.text || event.detail.value;
    // const commentInput = event.detail.value;
    // 防止为空
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComments(this.data.bookdetail.id, comment)
      .then(res => {
        wx.showToast({
          title: '+1',
          icon: "none"
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        });

        this.setData({
          comments: this.data.comments,
          posting: false,
        });
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