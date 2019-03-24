import * as React from 'react';
import styles from './index.less';
/**
 * react-redux
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
/**
 * interface
 */
import { Stores } from '../store/index';
// import { DispatchAbstract } from '../action/index';
import { RouteComponentProps } from 'react-router';
import { AbstractParams } from '../action';
import PostController from '../action/PostController';
import SignController from '../action/SignController';
import history from '../history';

interface PostProps extends RouteComponentProps<any> {
  dispatch: Dispatch;
}

interface PostState {}

class Post extends React.Component<PostProps, PostState> {

  componentDidMount = () => {
    const { match: { params: { id } } } = this.props;

    SignController.loginAuth().then(({login}) => {

      if (login === true) {

        const payload: AbstractParams<any> = {
          param: {
            post_id: id,
          }
        };
        PostController.postDetail(payload);
      } else {
        history.push('/sign');
      }
    });
  }

  public render() {
    return (
      <div className={styles.pContainer}>
        {this.renderLeft()}
        {this.renderRight()}
        Post
      </div>
    );
  }

  private renderLeft = (): JSX.Element => {
    return (
      <div className={styles.pLeft} >
        renderLeft
      </div>
    );
  }

  private renderRight = (): JSX.Element => {
    return (
      <div className={styles.pRight} >
        renderRight
      </div>
    );
  }

}

const mapStateToProps = (state: Stores) => ({
  
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Post);
