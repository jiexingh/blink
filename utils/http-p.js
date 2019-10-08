// 不能使用绝对路径
import {
  config
} from '../config.js';

// 根据错误码提示
const tips = {
  1: '抱歉 出错了 ',
  1005: 'key错误',
  3000: '期刊不存在',
  
}

class HTTP {
  //  注意花括号 变成了对象 =>解构
  request({url,data={},method='GET'}) {
    return new Promise((resolve,reject)=>{
        this._request(url,resolve,reject,data,method);
    });
  }

  _request(url,resolve,reject,data={},method='GET') {
  
    wx.request({
      url: config.api_base_url + url,
      data:data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // code是一个数字 要转成字符串
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          // 首先判断是否为空为空就不执行后面的
           resolve(res.data);
        } else {
          // 只改变状态而已
          reject();
          const error_code = res.data.error_code
          this._showError(error_code);
        }

      },
      fail: function(res) {
        reject();
        this._showError(1);
      },
      complete: function(res) {},
    });
  }

  _showError(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip=tips[error_code];
    wx.showToast({
      title: tip?tip:tips[1],
      icon: 'none',
      duration: 2000,
    })
  }
}
export {
  HTTP
};