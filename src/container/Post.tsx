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
import { Icon, Avatar, notification  } from 'antd';
import pstyles from './style/post.less';
import classnames from 'classnames';
import ReactPlayer from 'react-player';

export const Comment = ({ comment }: any) => {
  const commentCls = 'comment';
  return (
    <div className={pstyles[`${commentCls}`]} >
      <div className={pstyles[`${commentCls}-info`]}>
        <div className={pstyles[`${commentCls}-info-user`]}>
          <div className={pstyles[`${commentCls}-info-user-avator`]}>
            <img 
              className={pstyles[`${commentCls}-info-user-avator-img`]}
              src="//img.xiaohongshu.com/avatar/5cbf0c3a7d07960001e54863.jpg@80w_80h_90q_1e_1c_1x.jpg"
            />
          </div>
          <div className={pstyles[`${commentCls}-info-user-info`]}>
            <div className={pstyles[`${commentCls}-info-user-info-nickname`]}>
              aaaa哦随便
            </div>
            <div className={pstyles[`${commentCls}-info-user-info-time`]}>
              今天 09:07
            </div>
          </div>
        </div>
      </div>
      <div className={pstyles[`${commentCls}-content`]}>小姐姐，请问下，这个刷上保护层以后黏腻吗</div>
    </div>
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
            backgroundImage: `url("//ci.xiaohongshu.com/6f30d565-2b03-5445-aea7-a9e9fbf92524?imageView2/2/w/1080/format/jpg?imageView2/2/w/200/h/200/q/90")`
          }} 
        />
      </div>
      <div style={ContentStyle}>
        <span style={textStyle}>史上最良心7支口红全面试色💄红棕色，姨妈色</span>
      </div>
    </div>
  );
};

interface PostProps extends RouteComponentProps<any> {
  dispatch: Dispatch;
  postDetail: any;
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

        <div>
          <div>
            <Icon type="heart" />
            <span>{1}</span>
          </div>
          
        </div>
        <span>{`发布于  ${moment(postDetail && postDetail.post_pub_date || moment()).format('YYYY-MM-DD HH:mm:ss')}`}</span>

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
    const arr = new Array(8).fill({});

    const creatorcls = 'centerm-card-creator';
    return (
      <div className={classnames([pstyles['centerm-card-creator'], pstyles.mart])}>
        <h3 className={pstyles['centerm-card-creator-title']}>相关笔记</h3>
        <div className={pstyles['centerm-card-creator-list']}>
          {
            arr.map((a, index: number) => {
              return <Postrow key={index} />;
            })
          }
        </div>
        
        <div onClick={() => this.showMore()} className={classnames([pstyles[`${creatorcls}-title`], pstyles[`${creatorcls}-more`]])}>查看更多</div>
      </div>
    );
  }

  private renderTips = () => {
    const { } = this.props;
    const TipCls = 'centerm-tips';

    const comments = [1, 2, 3, 4];
    return (
      <div className={pstyles[`${TipCls}`]}>
        <h3 className={pstyles[`${TipCls}-title`]}>
          <i className={pstyles[`${TipCls}-title-i`]}/>
          <span>笔记评论</span>
        </h3>

        <div className={pstyles[`${TipCls}-content`]}>
          {
            comments.map((comment, index: number) => {
              return (<Comment key={index} comment={comment} />);
            })
          }
        </div>

        <div onClick={() => this.showMoreComment()} className={pstyles[`${TipCls}-more`]}>查看更多评论</div>
      </div>
    );
  }
}

const mapStateToProps = (state: Stores, ownProps: PostProps) => {
  const postDetail = getPostDetail(state, ownProps.match.params.id);
  return {
    postDetail
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Post);
