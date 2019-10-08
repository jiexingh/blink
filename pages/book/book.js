// pages/book/book.js
import {
  BookModel
} from '../../models/book.js';

import {
  random
} from '../../utils/common.js';
const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: '',
  },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   async onLoad(options) {
//     // // promise 对象 函数的区分
//     // //  Promise 第一步
//     // // 异步代码写入 promise 函数中
//     // const promise = new Promise((resolve, reject) => {
//     //   // promise 的三种状态 pending 进行中 fulfilled 已成功  reject 失败
//     //   wx.getSystemInfo({
//     //     success: res =>
//     //       // pending=>fulfilled
//     //       resolve(res),
//     //     fail: error =>
//     //       // pengding=>reject
//     //       reject(error),

//     //   })
//     // });
//     // // 精髓到处都可用
//     // promise.then(
//     //   res => console.log(res),
//     //   error => console.log(error)
//     // );

//     //  错误的promise 造成回调地狱用法
//     // const hostList = bookModel.getHotList();
//     // hostList.then(
//     //   res => {
//     //     console.log(res);
//     //     bookModel.getMyBookCount().then(
//     //       res => {
//     //         console.log(res)
//     //       }
//     //     );
//     //   }
//     // );

//     // 正确 一步一步return
//     // bookModel.getHotList()
//     //   .then(res => {
//     //     this.setData({
//     //       books: res
//     //     });
//     //     console.log(res);
//     //     // return bookModel.getMyBookCount();
//     //   })

      
//     // .then((res) => {
//     //   console.log(res);
//     //   return bookModel.getMyBookCount();
//     // })
//     // .then((res)=>{
//     //   console.log(res);
//     // });


// // async和await方法
//    const books= bookModel.getHotList()
//    this.setData({
//      books
//    })
//   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // // promise 对象 函数的区分
    // //  Promise 第一步
    // // 异步代码写入 promise 函数中
    // const promise = new Promise((resolve, reject) => {
    //   // promise 的三种状态 pending 进行中 fulfilled 已成功  reject 失败
    //   wx.getSystemInfo({
    //     success: res =>
    //       // pending=>fulfilled
    //       resolve(res),
    //     fail: error =>
    //       // pengding=>reject
    //       reject(error),

    //   })
    // });
    // // 精髓到处都可用
    // promise.then(
    //   res => console.log(res),
    //   error => console.log(error)
    // );

    //  错误的promise 造成回调地狱用法
    // const hostList = bookModel.getHotList();
    // hostList.then(
    //   res => {
    //     console.log(res);
    //     bookModel.getMyBookCount().then(
    //       res => {
    //         console.log(res)
    //       }
    //     );
    //   }
    // );

    // 正确 一步一步return
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        });
        console.log(res);
        // return bookModel.getMyBookCount();
      })


    // .then((res) => {
    //   console.log(res);
    //   return bookModel.getMyBookCount();
    // })
    // .then((res)=>{
    //   console.log(res);
    // });


// async和await方法
   const books= bookModel.getHotList()

  },


  onSearching() {
    this.setData({
      searching: true
    });
  },

  onCancel() {
    this.setData({
      searching: false
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
    this.setData({
      more: random(16)
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})