import * as React from 'react';
import styles from './index.less';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
import { Stores } from '../store/index';
import { RouteComponentProps } from 'react-router';
import { AbstractParams } from '../action';
import PostController from '../action/PostController';
import SignController from '../action/SignController';
import history from '../history';
import { getPostDetail } from 'src/store/post';
import moment from 'moment';
import { Icon, Avatar, notification, Comment as AntdComment, Tooltip, Form, Input, Button } from 'antd';
import pstyles from './style/post.less';
import classnames from 'classnames';
import ReactPlayer from 'react-player';
import { getRecommendPosts } from '../store/post';
import { getUserinfo } from '../store/user';
import invariant from 'invariant';

const { TextArea } = Input;

const Editor = ({
  onChange, onSubmit, value,
}: any) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        onClick={onSubmit}
        type="primary"
      >
        评论
      </Button>
    </Form.Item>
  </div>
);

export const Comment = ({ comment }: any) => {
  // const commentCls = 'comment';
  const actions: any[] = [
    (
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            // onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {/* {likes} */}
          0
        </span>
      </span>
    ),
    (
      <span>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            // onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {/* {dislikes} */}
          0
        </span>
      </span>
    ),
    (
      <span>回复数量{comment.comment_is_reply_comment}</span>
    )
  ];
  return (
    <AntdComment
      actions={actions}
      author={<a>{comment.comment_send_user_name}</a>}
      avatar={(
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      )}
      content={(
        <p>{comment.comment_content}</p>
      )}
      datetime={(
        <Tooltip title={moment(comment.comment_datetime).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      )}
    />
  );
};

export const Postrow = ({post}: any) => {

  const RowStyle = {
    width: '280px',
    height: '80px',
    margin: '10px 20px',
    color: '#555',
  };

  const ImgStyle: any = {
    position: 'relative',
    margin: '0 10px 0 0',
    overflow: 'hidden',
    float: 'left',
    background: '#f8f8fa',
    width: '80px',
    height: '80px',
    borderRadius: '4PX',
  };

  const ContentStyle: any = {
    float: 'left',
    width: '190px',
    margin: '3px 0 0 0',
  };

  const textStyle = {
    fontSize: '14px',
    height: '38px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0',
  };

  return (
    <div style={RowStyle}>
      <div style={ImgStyle}>
        <span 
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            // backgroundImage: `url("//ci.xiaohongshu.com/6f30d565-2b03-5445-aea7-a9e9fbf92524?imageView2/2/w/1080/format/jpg?imageView2/2/w/200/h/200/q/90")`
            backgroundImage: `url(${post.postCoverImgAddress})`,
          }} 
        />
      </div>
      <div style={ContentStyle}>
        <span style={textStyle}>{post.postName}</span>
      </div>
    </div>
  );
};

interface PostProps extends RouteComponentProps<any> {
  dispatch: Dispatch;
  postDetail: any;
  recommendPosts: any[];
  userinfo: any;
}

interface PostState {
  comment: string;
}

class Post extends React.Component<PostProps, PostState> {

  state = {
    comment: ''
  };

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
        PostController.getRandomPosts();
      } else {
        history.push('/sign');
      }
    });
  }

  public showMore = () => {
    notification.info({
      message: '查看更多',
      description: '暂无更多笔记可以查看~',
    });
  }

  public showMoreComment = () => {
    notification.info({
      message: '查看更多',
      description: '暂无更多评论可以查看~',
    });
  }

  public changeComment = ({target: { value }}: any) => {
    console.log('value: ', value);
    this.setState({comment: value});
  }

  public handleSubmit = async () => {
    const { postDetail, userinfo } = this.props;
    try {
      const params = {
        param: {
          post_id: postDetail.post_id,
          send_login_name: userinfo.user_id,
          comment_content: this.state.comment,
          is_reply_comment: '0',
        }
      };
  
      const { success, result } = await PostController.addCommentInf(params); 
  
      invariant(
        success,
        result || ' '
      );
      
      notification.success({message: '评论成功！'});
      window.location.reload();
    } catch (error) {
      notification.warn({message: error.message});
    }
  }

  public like = async () => {
    const { postDetail, userinfo } = this.props;
    try {
      const payload: AbstractParams<any> = {
        param: {
          post_id: `${postDetail.post_id}`,
          user_id: userinfo.user_id
        }
      };
      console.log('payload: ', payload);
      const { success, result } = await PostController.addLikeInf(payload);

      invariant(
        success,
        result || ' '
      );

      notification.success({message: '点赞成功！'});
    } catch (error) {
      notification.warn({message: error.message});
    }
  }
  public unLike = () => {
    console.log('unlike');
  }

  public render() {
    const { postDetail } = this.props;
    const BottomBar = () => {
      return (
        <div className={classnames(pstyles['centerm-bottom-bar'])}>
          <div className={classnames(pstyles['centerm-bottom-bar-creator'])}>
            <img 
              className={classnames(pstyles['centerm-bottom-bar-creator-img'])} 
              src={'https://img.xiaohongshu.com/avatar/5c9865b14ab84d0001a43cc2.jpg@80w_80h_90q_1e_1c_1x.jpg'} 
            />
            <div className={classnames(pstyles['centerm-bottom-bar-creator-name'])}>
              {postDetail.post_pub_user_name}
            </div>
          </div>
          <div className={classnames(pstyles['centerm-bottom-bar-creator'])}>
            <div className={classnames(pstyles['centerm-bottom-bar-creator-name'])}>
              {`      一起分享给朋友看吧！`}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className={classnames(styles.pContainer, styles.padb)}>
        {this.renderLeft()}
        {this.renderRight()}
        
        <BottomBar/>
      </div>
    );
  }

  private renderLeft = (): JSX.Element => {
    const { postDetail } = this.props;

    const RenderCover = (props: any) => {
      const { postDetail } = props;

      if (postDetail.video_address && postDetail.video_address[0]) {

        return (
          <div>
            <ReactPlayer 
              style={{backgroundColor: '#000000'}}
              width={500} 
              height={500} 
              url={'http://v.xiaohongshu.com/90eead44c52983b60d542a95263d659da90068e8?sign=f05fbcc94c7c64eeead6a879ea03087f&t=5cc71f80'} 
              playing={true}
              controls={true}
            />
          </div>
        );
      } else {
        return (
          <img src="//ci.xiaohongshu.com/d147b97d-2be9-5f9d-b18f-30049001725b?imageView2/2/w/1080/format/jpg" />
        );
      }
    };

    return (
      <div className={styles.pLeft} >
        <RenderCover postDetail={postDetail} />
        {/* renderdetail */}

        <div className={pstyles['centerm-content']}>
          <p className={pstyles['centerm-text-p']} >夏天到啦，一份奶黄奶黄～你要嘛～</p>
          <p className={pstyles['centerm-text-p']} >推荐色：液态硅胶壳-奶黄色💛</p>
          <p className={pstyles['centerm-text-p']} >这个色一点也不荧光，不会看起来土土的hhh！</p>
          <p className={pstyles['centerm-text-p']} >手机拍摄的🎬，亮灯光下～</p>
          <p className={pstyles['centerm-text-p']} >这个壳子是好多明星同款噢，疯狂种草！</p>
          <p className={pstyles['centerm-text-p']} >这个材质也是非常厉害的！敲舒服，磨砂手感，硅胶材质～</p>
          <p className={pstyles['centerm-text-p']} >里面有绒面是可以散热的，很舒服！</p>
          <p className={pstyles['centerm-text-p']} >快给你的壳子穿衣服😊</p>
          <p className={pstyles['centerm-text-p']} >我是RMB💰23购入的，价格便宜，质量也算不错的咯…</p>
          <p className={pstyles['centerm-text-p']} >购入某🍑，看图～</p>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span style={{marginRight: '8px'}}>
              {`点赞数：${postDetail.like_count}`}
            </span>
            {
              postDetail.is_like === '1' ? (
                <div onClick={() => this.like()}>
                  <Icon type="heart" />
                </div>
              ) : (
                <div onClick={() => this.like()}>
                  <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                </div>
              )
            }
          </div>

          <span>{`发布于  ${moment(postDetail && postDetail.post_pub_date || moment()).format('YYYY-MM-DD HH:mm:ss')}`}</span>
        </div>

        {this.renderTips()}
      </div>
    );
  }

  private renderRight = (): JSX.Element => {
    const { postDetail } = this.props;

    const CreatorCard = (props: any) => {
      const { } = props;
      return (
        <div className={pstyles['centerm-card-creator']}>
          <h3 className={pstyles['centerm-card-creator-title']}>笔记作者</h3>
          <div className={pstyles['centerm-card-creator-item']}>
            <Avatar style={{width: '50px', height: '50px'}} src="https://img.xiaohongshu.com/avatar/5c9865b14ab84d0001a43cc2.jpg@80w_80h_90q_1e_1c_1x.jpg" />
            <span className={pstyles['centerm-card-creator-item-name']}>{postDetail.post_pub_user_name}</span>
          </div>
        </div>
      );
    };

    return (
      <div className={styles.pRight} >
        <CreatorCard  />

        {this.renderOtherPosts()}
      </div>
    );
  }

  private renderOtherPosts = (): JSX.Element => {
    const { recommendPosts } = this.props;

    const creatorcls = 'centerm-card-creator';
    return (
      <div className={classnames([pstyles['centerm-card-creator'], pstyles.mart])}>
        <h3 className={pstyles['centerm-card-creator-title']}>相关笔记</h3>
        <div className={pstyles['centerm-card-creator-list']}>
          {
            recommendPosts && recommendPosts.length > 0
            ? recommendPosts.map((post: any, index: number) => {
              return <Postrow post={post} key={index} />;
            })
            : null
          }
        </div>
        
        <div onClick={() => this.showMore()} className={classnames([pstyles[`${creatorcls}-title`], pstyles[`${creatorcls}-more`]])}>查看更多</div>
      </div>
    );
  }

  private renderTips = () => {
    const { postDetail } = this.props;
    const TipCls = 'centerm-tips';

    const {comments} = postDetail;
    return (
      <div className={pstyles[`${TipCls}`]}>
        <h3 className={pstyles[`${TipCls}-title`]}>
          <i className={pstyles[`${TipCls}-title-i`]}/>
          <span>笔记评论</span>
        </h3>

        {
          comments && comments.length > 0 ? (
            <div>
              <div className={pstyles[`${TipCls}-content`]}>
                {
                  comments.map((comment: any, index: number) => {
                    return (<Comment key={index} comment={comment} />);
                  })
                }
              </div>

              <div onClick={() => this.showMoreComment()} className={pstyles[`${TipCls}-more`]}>查看更多评论</div>
            </div>
          ) : (
            <div className={pstyles[`${TipCls}-more`]}>暂无评论</div>
          )
        }
        <AntdComment
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          )}
          content={(
            <Editor
              onChange={this.changeComment}
              onSubmit={this.handleSubmit}
              // submitting={submitting}
              value={this.state.comment}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: Stores, ownProps: PostProps) => {
  const postDetail = getPostDetail(state, ownProps.match.params.id);
  return {
    postDetail,
    recommendPosts: getRecommendPosts(state),
    userinfo: getUserinfo(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Post);