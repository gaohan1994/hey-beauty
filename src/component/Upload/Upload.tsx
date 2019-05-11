import React, { Component } from 'react';
import { Button, Icon, Upload, Modal, Input } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import config from '../../common/config';
import SignController from '../../action/SignController';
import history from '../../history';
import Dialog from '../Dialog';
import Validator from '../../common/validator';
import invariant from 'invariant';
import PostController from '../../action/PostController';

const { TextArea } = Input;

interface UploaderProps {}

interface UploaderState {
  fileList: UploadFile[];
  previewList: UploadFile[];
  uploading: boolean;
  previewVisible: boolean;
  previewImage: string;
  content: string;
  postName: string;
}

class Uploader extends Component<UploaderProps, UploaderState> {
  state = {
    fileList: [],
    previewList: [],
    uploading: false,
    previewVisible: false,
    previewImage: '',
    content: '',
    postName: '',
  };

  public handleCancel = () => this.setState({ previewVisible: false });

  public handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  public handleChange = ({ file, fileList }: any) => {
    console.log('file: ', file);
    console.log('fileList: ', fileList);
    this.setState({ fileList });
  }

  public checkAuth = () => {
    const helper = new Validator();

    helper.add(this.state.content, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入帖子内容',
      elementName: 'content',
    }]);

    helper.add(this.state.postName, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入帖子标题',
      elementName: 'postName',
    }]);

    const result = helper.start();

    if (result) {
      return { success: false, result: result.errMsg };
    } else {
      return { 
        success: true, 
        result: {
          post_content: this.state.content,
          post_name: this.state.postName,
        }
      };
    }
  }

  public handleUpload = () => {
    const { fileList } = this.state;
    console.log('fileList: ', fileList);
    // let formData = new FormData();

    const { success: checkSuccess, result: checkResult } = this.checkAuth();

    try {
      invariant(
        checkSuccess,
        checkResult || ' '
      );

      SignController.loginAuth().then(async ({login, userinfo}) => {
        if (login === true) {
          try {
            let payload: any = {
              ...checkResult,
              user_id: userinfo.user_id,
            };
            console.log('payload: ', payload);
            {
              const doneList: any[] = fileList.map((file: UploadFile) => {
                return file.response && file.response.key ? file : undefined;
              }).filter(p => !!p);

              console.log('doneList: ', doneList);

              invariant(
                doneList.length > 0,
                '请上传图片'
              );

              const video_address_arr = doneList.map((item: any) => {
                return item.response.key;
              });

              const coverIndex = doneList.findIndex((doneItem: any, index: number) => doneItem.type.indexOf('image') !== -1);

              invariant(
                coverIndex !== -1,
                '请上传一张图片作为封面'
              );

              payload = {
                ...payload,
                post_cover_img_address: doneList[coverIndex] && doneList[coverIndex].response.key,
                video_address: video_address_arr.join(','),
              };

              const { success, result } = await PostController.addPostInf(payload);
              invariant(
                success,
                '发帖失败'
              );

              Dialog.showToast('成功发帖');
              history.push(`/post/${result.post_id}`);
            }
      
            this.setState({ uploading: true });  
          } catch (error) {
            Dialog.showToast(error.message);
          }
        } else {
          history.push('/login');
        }
      });
    } catch (error) {
      console.log('error: ', error);
      Dialog.showToast(error.message);
    }
  }

  public onChangePostName = ({target: { value }}: any) => {
    this.setState({ postName: value });
  }
  public onChangeContent = ({target: { value }}: any) => {
    this.setState({ content: value });
  }

  render() {
    const { uploading, previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <div style={{width: '800px'}}>
        <div className="clearfix">
          <Upload
            action={`${config.FETCH_ENTRY}/app/upload`}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {/* {fileList.length >= 3 ? null : uploadButton} */}
            {uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>

        <div style={{marginTop: '12px'}}>
          <span>帖子标题</span>
          <Input value={this.state.postName} onChange={this.onChangePostName} placeholder="请输入标题" />
        </div>
        
        <div style={{marginTop: '12px'}}>
          <span>帖子内容</span>
          <TextArea value={this.state.content} onChange={this.onChangeContent} rows={4} placeholder="请输入内容" />
        </div>

        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}

export default Uploader;