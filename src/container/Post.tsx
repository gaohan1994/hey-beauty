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
import Swiper from 'react-swipeable-views';

const { TextArea } = Input;

export function checkVideo (video: string): boolean {
  
  if (
    video.indexOf('.mp4') !== -1 ||
    video.indexOf('rm' ) !== -1 ||
    video.indexOf('mov' ) !== -1 ||
    video.indexOf('wmv' ) !== -1 ||
    video.indexOf('flv' ) !== -1 ||
    video.indexOf('.rmvb') !== -1 ||
    video.indexOf('.avi') !== -1 ||
    video.indexOf('.ts') !== -1 
  ) {
    return true;
  } else {
    return false;
  }
}

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

  const postClick = (post: any) => {
    history.push(`/post/${post.postId}`);
  };

  return (
    <div style={RowStyle} onClick={() => postClick(post)}>
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
  index: number;
}

class Post extends React.Component<PostProps, PostState> {

  state = {
    comment: '',
    index: 0,
  };

  componentDidMount = () => {
    this.init();
  }

  public changeIndex = (index: number) => {
    console.log('changeIndex: ', index);
    this.setState({ index }, () => {
      console.log('this.state: ', this.state);
    });
  }

  public RenderCover = (props: any) => {
    const { postDetail } = props;

    const swiperContainer = {height: '500px'};

    const buttonStyle: any = {
      width: '40px',
      height: '40px',
      background: '#f2f2f2',
      color: '#000000',
      borderRadius: '20px',
      lineHeight: '40px',
      textAlign: 'center',
      position: 'absolute',
      top: '220px',
      zIndex: '9999',
      fontSize: '14px',
    };
    return (
      <div style={{position: 'relative'}}>
        {
          postDetail.video_address && postDetail.video_address.length > 0 ? (
            <div onClick={() => this.onNext()} style={{...buttonStyle, right: '20px' }} >
              {`>`}
            </div>
          ) : null
        }

        { 
          postDetail.video_address && postDetail.video_address.length > 0 ? (
            <div onClick={() => this.onLast()} style={{...buttonStyle, left: '20px' }} >
              {`<`}
            </div>
          ) : null
        }
        <Swiper 
          autoPlay={true}
          index={this.state.index}
          onChangeIndex={this.changeIndex}
          style={swiperContainer}
        >
          {
            postDetail.video_address && postDetail.video_address.length > 0
              ? postDetail.video_address && postDetail.video_address.map((item: any, index: number) => {

                if (checkVideo(item) === false) {
                  return (
                    <div style={swiperContainer} key={index}>
                      <img src={item} />
                      {/* <img src="//ci.xiaohongshu.com/d147b97d-2be9-5f9d-b18f-30049001725b?imageView2/2/w/1080/format/jpg" /> */}
                    </div>
                  );
                } else {
                  return (
                    <div style={swiperContainer} key={index}>
                      <ReactPlayer 
                        style={{backgroundColor: '#000000'}}
                        width={500} 
                        height={500} 
                        url={item}
                        controls={true}
                      />
                    </div>
                  );
                }
              })
              : <div style={swiperContainer}>加载中</div>
          }
        </Swiper>
      </div>
    );
  }

  public onNext = () => {

    if (this.props.postDetail && this.props.postDetail.video_address && this.props.postDetail.video_address.length > 0) {
      console.log('this.props.postDetail.video_address.length: ', this.props.postDetail.video_address.length);
      console.log('this.state.index + 1: ', this.state.index + 1);
      if (this.state.index < this.props.postDetail.video_address.length - 1) {
        console.log('true');
        this.changeIndex(this.state.index + 1);
      }
    }
  }
  public onLast = () => {
    console.log('this.state.index: ', this.state.index);
    if (this.state.index > 0) {
      this.changeIndex(this.state.index - 1);
    }
  }

  public init = () => {
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
  
      this.changeComment({target: {value: ''}});
      invariant(
        success,
        result || ' '
      );
      
      notification.success({message: '评论成功！'});
      
      setTimeout(() => {
        this.init();
      }, 1000);
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

      {
        postDetail.is_like === '1' 
          ? notification.info({message: '取消点赞'})
          : notification.success({message: '点赞成功！'});
      }

      setTimeout(() => {
        this.init();
      }, 1000);
    } catch (error) {
      notification.warn({message: error.message});
    }
  }

  public doCollect = async () => {
    const { postDetail, userinfo } = this.props;
    try {
      
      const payload = {
        post_id: `${postDetail.post_id}`,
        user_id: userinfo.user_id
      };

      console.log('payload: ', payload);
      const { success } = await PostController.addCollectionInf(payload);
      invariant(
        success,
        '收藏失败'
      );
      notification.success({message: '收藏成功！'});
      setTimeout(() => {
        this.init();
      }, 1000);
    } catch (error) {
      notification.warn({message: error.message});
    }
  }

  public cancelCollect = async () => {
    const { postDetail, userinfo } = this.props;
    try {
      
      const payload = {
        post_id: `${postDetail.post_id}`,
        user_id: userinfo.user_id
      };

      const { success } = await PostController.cancelCollectionInf(payload);
      invariant(
        success,
        '取消收藏失败'
      );
      notification.info({message: '取消收藏'});
      setTimeout(() => {
        this.init();
      }, 1000);
    } catch (error) {
      notification.warn({message: error.message});
    }
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

    const RenderPContent = ({post}: any) => {

      const { post_content } = post;

      const contentArray: string[] = post_content.split(' ');
      return (
        <div className={pstyles['centerm-content']}>
          {
            contentArray.map((c: any, index: number) => {
              return (
                <p key={index} className={pstyles['centerm-text-p']} >{c}</p>
              );
            })
          }
         
          {/* <p className={pstyles['centerm-text-p']} >推荐色：液态硅胶壳-奶黄色💛</p>
          <p className={pstyles['centerm-text-p']} >这个色一点也不荧光，不会看起来土土的hhh！</p>
          <p className={pstyles['centerm-text-p']} >手机拍摄的🎬，亮灯光下～</p>
          <p className={pstyles['centerm-text-p']} >这个壳子是好多明星同款噢，疯狂种草！</p>
          <p className={pstyles['centerm-text-p']} >这个材质也是非常厉害的！敲舒服，磨砂手感，硅胶材质～</p>
          <p className={pstyles['centerm-text-p']} >里面有绒面是可以散热的，很舒服！</p>
          <p className={pstyles['centerm-text-p']} >快给你的壳子穿衣服😊</p>
          <p className={pstyles['centerm-text-p']} >我是RMB💰23购入的，价格便宜，质量也算不错的咯…</p>
          <p className={pstyles['centerm-text-p']} >购入某🍑，看图～</p> */}
        </div>
      );
    };

    return (
      <div className={styles.pLeft} >
        {this.RenderCover(this.props)}
        {/* <RenderCover postDetail={postDetail} /> */}
        {/* renderdetail */}

        {
          postDetail.post_content ? (
            <RenderPContent post={postDetail} />
          ) : null
        }

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

            {
              postDetail.is_collection === '1' ? (
                <span style={{marginLeft: '6px'}} onClick={() => this.cancelCollect()}>取消收藏</span>
              ) : (
                <span style={{marginLeft: '6px'}} onClick={() => this.doCollect()}>收藏</span>
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