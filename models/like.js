import {
  HTTP
} from '../utils/http.js';
class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel';
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    });
  }

  getClassicLikeStatus(artID, categary, sCallback) {
    this.request({
      url:'classic/'+categary+'/'+artID+'/favor',
      success:(res)=>{
        sCallback(res)
      }
    });
  }
}
export {
  LikeModel
};