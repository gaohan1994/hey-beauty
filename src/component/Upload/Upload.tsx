import React, { Component } from 'react';
import { Button, Icon, Upload, Modal } from 'antd';
import { UploadProps, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile, RcFile } from 'antd/lib/upload/interface';
import config from '../../common/config';
// import BusinessController from '../../action/BusinessController';
// import reqwest from 'reqwest';

class PicturesWall extends React.Component<any, any> {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }: any) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

interface UploaderProps {}

interface UploaderState {
  fileList: UploadFile[];
  previewList: UploadFile[];
  uploading: boolean;
}

class Uploader extends Component<UploaderProps, UploaderState> {
  state = {
    fileList: [],
    previewList: [],
    uploading: false,
  };

  public handleUpload = () => {
    const { fileList } = this.state;
    console.log('fileList: ', fileList);
    let formData = new FormData();

    try {
      {
        fileList.forEach((file: any) => {
          formData.append('file', file);
        });
      }

      this.setState({
        uploading: true,
      });    

      // BusinessController.addPostInf(formData);

      fetch(`${config.FETCH_ENTRY}/app/test`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        return res.json();
      }).then((res) => {
        console.log('res: ', res);
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  public onChangeHandle = (info: UploadChangeParam) => {
    const { fileList } = info;
    this.setState(state => ({
      fileList,
    }));
  }

  public onRemoveHandle = (file: UploadFile) => {
    this.setState((state: UploaderState) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }

  public beforeUploadHandle = (file: RcFile, FileList: RcFile[]) => {
    // console.log('file', file);
    // console.log('FileList: ', FileList);
    // this.setState(state => ({
    //   fileList: [...state.fileList, file],
    // }));
    return false;
  }

  public onPreview = (file: UploadFile) => {
    console.log('file: ', file); 
  }

  render() {
    const { uploading, fileList } = this.state;
    const uploadProps: UploadProps = {
      name: 'file',
      onChange: this.onChangeHandle,
      onRemove: this.onRemoveHandle,
      beforeUpload: this.beforeUploadHandle,
      onPreview: this.onPreview,
      fileList,
    };

    return (
      <div>
        <PicturesWall />
        <Upload {...uploadProps} >
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>

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