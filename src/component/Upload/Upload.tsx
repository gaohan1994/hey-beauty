import React, { Component } from 'react';
import { Button, Icon, Upload } from 'antd';
import { UploadProps, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile, RcFile } from 'antd/lib/upload/interface';
// import BusinessController from '../../action/BusinessController';
// import reqwest from 'reqwest';

interface UploaderProps {}

interface UploaderState {
  fileList: UploadFile[];
  uploading: boolean;
}

class Uploader extends Component<UploaderProps, UploaderState> {
  state = {
    fileList: [],
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

      fetch('http://192.168.31.51:8080/app/test', {
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
    console.log('info: ', info);
    const { fileList } = info;
    this.setState(state => ({
      fileList,
    }));
  }

  public onRemoveHandle = (file: UploadFile) => {
    console.log('file: ', file);
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

  render() {
    const { uploading, fileList } = this.state;
    const uploadProps: UploadProps = {
      name: 'file',
      // action: 'http://192.168.31.51:8080/app/test',
      onChange: this.onChangeHandle,
      onRemove: this.onRemoveHandle,
      beforeUpload: this.beforeUploadHandle,
      fileList,
    };

    return (
      <div>
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