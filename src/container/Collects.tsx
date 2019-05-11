import React, { Component } from 'react';
import SignController from '../action/SignController';
import history from '../history';
import PostController from '../action/PostController';
import classnames from 'classnames';
import styles from './style/post.less';
import { connect } from 'react-redux';
import { Stores } from 'src/store';
import { getCollectionList } from '../store/post';
import { PostCard } from './Posts';
import { Skeleton } from 'antd';

class Collects extends Component<any, any> {

  componentDidMount() {
    SignController.loginAuth().then(({login, userinfo}) => {
      if (login === true) {
        const payload = {
          user_id: userinfo.user_id,
          page_index: 1,
          page_size: 200
        };

        PostController.collectionList(payload);
      } else {
        history.push('/login');
      }
    });
  }
  
  render() {
    const { collectionList } = this.props;
    return (
      <div className={styles['centerm-posts']}>
        <div className={classnames(styles['centerm-cards'])}>
          {
            collectionList && collectionList.length > 0 ? collectionList.map((post: any, index: number) => {
              return (<PostCard key={index} post={post} />);
            }) : <Skeleton loading={true} />
          }
        </div>
      </div>
    );
  }
}

const mapState = (state: Stores) => ({
  collectionList: getCollectionList(state),
});

const mapDispatch = (dispatch: any) => ({
  dispatch,
});

export default connect(mapState, mapDispatch)(Collects);