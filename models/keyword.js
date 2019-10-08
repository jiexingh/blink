import {
  HTTP
} from '../utils/http-p.js';


class KeywordModel extends HTTP {
  key = 'q';
  maxLength = 10;

  // 加入历史缓存
  addToHistory(keyWord) {
    let words = this.getHistory();
    const has = words.includes(keyWord);
    if (!has) {
      // 如果用户一直搜索 那么会一直添加历史 因此给一个最大的历史搜索数组限制
      const length = words.length;
      if (length >= this.maxLength) {
        words.pop();
      }
      words.unshift(keyWord);
      wx.setStorageSync(this.key, words);
    }

  }

  // 获取缓存历史记录
  getHistory(keyWord) {
    const words = wx.getStorageSync(this.key);
    // 防止添加的使用函数出错 代码的严密性
    if (!words) {
      return [];
    }
    return words;
  }

  // 获取热门
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }



}
export {
  KeywordModel
};