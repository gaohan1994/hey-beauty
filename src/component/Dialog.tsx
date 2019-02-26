import { Component } from 'react';
import { message } from 'antd';

class Dialog extends Component {
  
  static showToast = (content: string) => {
    message.info(content);
  }
}

export default Dialog;