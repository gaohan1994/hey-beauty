import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import Actions from '../action/index';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
import { getPostList } from '../store/post';
import { DispatchAbstract } from '../action/index';
import PostController from '../action/PostController';
import { Skeleton, Card, Avatar, Icon } from 'antd';
import styles from './style/post.less';
import classnames from 'classnames';
import history from '../history';
// import SignController from 'src/action/SignController';

interface PostsProps {
  postList: any[];
  dispatch: Dispatch<any>;
}

type Props = PostsProps;

interface PostsState {}

type State = Readonly<PostsState>;

class Posts extends Component<Props, State> {

  componentDidMount() {
    const { dispatch } = this.props;

    const payload: DispatchAbstract<any> = {
      dispatch,
      param: {
        page_index: 1,
        page_size: 20
      }
    };

    PostController.postList(payload);
  }

  render() {
    const { postList } = this.props;

    const onCardClickHandle = (post: any) => {
      history.push(`/post/${post.post_id}`);
    };

    const PostCard = ({post}: any) => {
      return (
        <Card
          onClick={() => onCardClickHandle(post)}
          hoverable={true}
          className={classnames(styles['centerm-card'])}
          cover={
            // <img alt="" src={post.post_cover_img_address} />
            <img className={styles['centerm-card-image']} src={'//ci.xiaohongshu.com/d147b97d-2be9-5f9d-b18f-30049001725b?imageView2/2/w/1080/format/jpg'} />} 
        >
          <Skeleton loading={!(post && post.post_id)} >
            <div className={styles['centerm-card-meta']}>
              <h3 className={styles['centerm-card-meta-title']}>{post.post_name}</h3>

              <div className={styles['centerm-card-meta-info']}>
                <div className={styles['centerm-card-meta-item']}>
                  <Avatar src={post.images} />
                  <span className={styles['centerm-card-meta-name']}>{post.post_pub_user_name}</span>
                </div>
                <div className={styles['centerm-card-meta-item']}>
                  <Icon type="heart" />
                  <span className={styles['centerm-card-meta-name']}>{post.like_count}</span>
                </div>
              </div>
            </div>
          </Skeleton>
        </Card>
      );
    };
    
    return (
      <div className={styles['centerm-posts']}>
        <div className={classnames(styles['centerm-cards'])}>
          {
            postList && postList.length > 0 ? postList.map((post: any, index: number) => {
              return (<PostCard key={index} post={post} />);
            }) : <Skeleton loading={true} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  postList: getPostList(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Posts);