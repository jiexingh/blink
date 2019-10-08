// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js';
import {
  BookModel
} from '../../models/book.js';
import {
  paginationBev
} from '../behaviors/pagination.js';
const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [],//此处行为已经接管
    searching: false,
    qword: '',
    loading: false,
    loadingCenter: false,
  },


  attached() {
    // const historyWords = keywordModel.getHistory();
    // const hotWords = keywordModel.getHot();
    // console.log(historyWords);
    this.setData({
      historyWords: keywordModel.getHistory()
    });
    // hotWords.then(res => {
    //   console.log(res);
    //   this.setData({
    //     hotWords: res.hot
    //   });
    // });
    keywordModel.getHot().then(res => {
      console.log(res);
      this.setData({
        hotWords: res.hot
      });
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.qword) {
        return
      }
      // 锁的概念->防止没加载完成用户又刷新 重复加载
      // if (this.data.loading) {
      if (this.isLocked()) {
        return
      }
      // const length = this.data.dataArray.length;//行为接管

      // bookModel.search(length, this.data.qword)
      if (this.hasMore()) {
        // 锁的概念
        // this.data.loading = true;
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.qword)
          .then(res => {
            // const tempDataArray = this.data.dataArray.concat(res.books);
            this.setMoreData(res.books);
            // this.data.loading = false;
            this.unLocked();
            // this.setData({
            //   // dataArray: tempDataArray,
            //   loading: false,
            // });
          }, () => {
            // 这是为了避免断网的时候死锁 无法解开
            this.unLocked();
          });
      }
    },


    onCancel(event) {
      this.triggerEvent('cancel', {}, {});
      this.initialize();
    },

    onDelete() {
      // this.setData({
      //   searching: false,
      // });
      this._closeResult();
      this.initialize();
    },

    onConfirm(event) {
      this._showResult();
      this._showLoadingCenter();
      // 用行为置空
      // this.initialize();
      const word = event.detail.value || event.detail.text;
      if (word != '') {
        this.setData({
          // dataArray: res.books,
          qword: word,
        });
        // keywordModel.addToHistory(word);
        bookModel.search(0, word)
          .then(res => {
            // 行为的使用
            this.setMoreData(res.books);
            this.setTotal(res.total);
            keywordModel.addToHistory(word);
            this._hiddenLoadingCenter();
            // console.log(res);
          });
      }
    },

    _showResult() {
      this.setData({
        searching: true,
      });
    },

    _closeResult() {
      this.setData({
        searching: false,
        qword: '',
      });
    },
    //  提取到行为pagination
    // _isLocked() {
    //   return this.data.loading ? true : false;
    // },

    // _locked() {
    //   this.setData({
    //     loading: true
    //   });
    //   // this.data.loading = true;
    // },

    // _unLocked() {
    //   this.setData({
    //     loading: false
    //   });
    //   // this.data.loading = false;
    // },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      });
    },
    _hiddenLoadingCenter() {
      this.setData({
        loadingCenter: false
      });
    }
  }
})