import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import Actions from '../action/index';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
import { getPostList } from '../store/post';
import { DispatchAbstract } from '../action/index';
import PostController from '../action/PostController';
import { Skeleton, Card, Avatar } from 'antd';
// import styles from './style/post.less';
import styles from './style/post.less';
import classnames from 'classnames';
import history from '../history';
// import SignController from 'src/action/SignController';

const { Meta } = Card;

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
      
      const cardStyle = {
        width: 250,
        borderRadius: 10,
      };

      return (
        <Card
          onClick={() => onCardClickHandle(post)}
          hoverable={true}
          style={cardStyle}
          cover={<img alt="" src={post.post_cover_img_address} />}
        >
          <Skeleton loading={!(post && post.post_id)} >
            <Meta
              className={classnames(styles['centerm-card-meta'])}
              avatar={<Avatar src={post.images} />}
              title={post.post_name}
              description={`作者：${post.post_pub_user_name}`}
            />
          </Skeleton>
        </Card>
      );
    };

    return (
      <div className={classnames(styles['centerm-card'])}>
        
        {
          postList && postList.length > 0 ? postList.map((post: any, index: number) => {
            return (<PostCard key={index} post={post} />);
          }) : <Skeleton loading={true} />
        }
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