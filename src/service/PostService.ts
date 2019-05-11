import request from '../common/request';
import config from '../common/config';

class PostService {

  public addPostInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/addPostInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public addCollectionInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/addCollectionInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public cancelCollectionInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/cancelCollectionInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public collectionList = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/collectionList`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public addCommentInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/addCommentInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public addLikeInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/addLikeInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public postList = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/postList`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public postDetail = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/getPostDetail`,
      'POST',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public getRandomPosts = () => {
    return request(
      `${config.FETCH_ENTRY}/app/getRandomPosts`,
      'post',
      {
        biz_content: {
          
        }
      }
    );
  }
}

export default new PostService();