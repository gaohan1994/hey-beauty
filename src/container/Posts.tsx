import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import Actions from '../action/index';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
import { getPostList } from '../store/post';
import { DispatchAbstract } from '../action/index';
import PostController from 'src/action/PostController';

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
    return (
      <div>
        Posts
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