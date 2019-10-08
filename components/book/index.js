// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
    console.log(event);
    const bid=this.properties.book.id;
    console.log(bid);
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bid=${bid}`,
    })
    }
  }
})
