// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer(newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal;
        // 修改属性本身的值会造成泄露
        this.setData({
          _index: val
        });

      }
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    month: 0,
    yeal: '',
    _index: ''
  },

  attached: function() {
    let date = new Date();
    let yeal = date.getFullYear();
    // 真实的月份会少1
    let month = date.getMonth();
    this.setData({
      yeal: yeal,
      month: this.data.months[month]
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})