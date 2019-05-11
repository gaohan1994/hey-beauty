import React, { Component } from 'react';
import { Uploader } from '../component';

type Props = {};

/**
 * `上传页面`
 *
 * @class Update
 * @extends {Component<Props, any>}
 */
class Update extends Component<Props, any> {
  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '12px'}}>
        <Uploader />
      </div>
    );
  }
}

export default Update;