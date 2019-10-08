import {
  HTTP
} from "../utils/http.js";

class ClassModel extends HTTP {
  // 获取最新一期
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res);
        this._setLatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res)
      }
    });
  }
  // 获取期刊
  getclassic(index, nextOrPrevious, sCallback) {

    // 缓存中寻找或者API调用
    // key确定

    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res);
          sCallback(res);
        }
      });
    } else {
      sCallback(classic);
    }
  }
  // 判断是第一期
  isFist(index) {
    return index == 1 ? true : false;
  }

  // 判断最后一期
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false;
  }
  // 存储最新的期刊号
  _setLatestIndex(index) {
    // 同步写入
    wx.setStorageSync('latestIndex', index);
  }

  // 获取缓存
  _getLatestIndex() {
    let index = wx.getStorageSync('latestIndex');
    return index;
  }

  // 获取缓存
  _getKey(index) {
    let key = 'classic-' + index;
    return key;
  }

  //  获取最喜欢的书
  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params);
  }
}
export {
  ClassModel
};