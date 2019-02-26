import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from './index.less';
import classnames from 'classnames';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../store/index';
import { DispatchAbstract } from '../action/index';
import SignController from '../action/SignController';

interface UserFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class Register extends Component<UserFormProps, any> {

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const payload: DispatchAbstract<any> = {
          dispatch: this.props.dispatch,
          param: values
        };
        console.log('payload: ', payload);
        SignController.signUp(payload);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={classnames(styles.pCenter, styles.container)}>
        <div style={{width: '800px'}}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="Name">
              {getFieldDecorator('username', {
                rules: [{
                  required: true,
                  message: '请输入您的账号',
                }],
              })(
                <Input placeholder="请输入您的账号" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Password">
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请输入密码',
                }],
              })(
                <Input placeholder="请输入密码" type="password" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Nickname">
              {getFieldDecorator('nickname', {
                rules: [{
                  required: true,
                  message: '请输入昵称',
                }],
              })(
                <Input placeholder="请输入昵称" />
              )}
            </Form.Item>

            <Form.Item {...formTailLayout}>
              <Button type="primary" htmlType="submit">注册</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const RegisterForm = Form.create({ name: 'register' })(Register);

const mapStateToProps = (state: Stores) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);