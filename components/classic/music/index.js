// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js';
const backgroundAudioManager = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    // img: String,
    // content: String,
    src: String,
    title: String,
  },

  // 在组件实例进入页面节点树时执行
  attached(event) {
    this._recoverStatus();
    this._monitiorSwitch();
  },
  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onplay: function() {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        });
        backgroundAudioManager.title = this.properties.title;
        backgroundAudioManager.src = this.properties.src;
      } else {
        this.setData({
          playing: false,
        });
        backgroundAudioManager.pause();
      }

    },

    _recoverStatus: function() {
      if (backgroundAudioManager.paused) {
        this.setData({
          playing: false,
        });
        return
      }
      if (backgroundAudioManager.src == this.data.src) {
        this.setData({
          playing: true
        });
      }
    },

    _monitiorSwitch: function() {
      backgroundAudioManager.onPlay(() => {
        this._recoverStatus();
      });
      backgroundAudioManager.onPause(() => {
        this._recoverStatus();
      });
      backgroundAudioManager.onStop(() => {
        this._recoverStatus();
      });
      backgroundAudioManager.onEnded(() => {
        this._recoverStatus();
      });
    }

  }
})