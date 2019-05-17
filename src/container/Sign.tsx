import React, { Component } from 'react';
import {
  Icon, Input, Button, Form
} from 'antd';
import styles from './index.less';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import SignController from '../action/SignController';
import { DispatchAbstract } from '../action/index';
import { Dispatch, connect } from 'react-redux';
import { Stores } from '../store/index';
import { mergeProps } from '../common/config';

type Props = {
  dispatch: Dispatch<any>;
} & FormComponentProps;

type State = {};

class Sign extends Component<Props, State> {

  handleSubmit = async (e: any) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const payload: DispatchAbstract<any> = {
          dispatch,
          param: {
            user_id: values.username,
            passwd: values.password
          }
        };
        console.log('payload: ', payload);
        SignController.login(payload);
        // SignController.loginAuth().then((res: any) => {
        //   console.log('res: ', res);
        // });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={classnames(styles.pCenter, styles.container)}>
        <Form onSubmit={this.handleSubmit} style={{width: '300px'}}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
            没有账号？<Link to="/register">立即注册!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const SignForm = Form.create({ name: 'sign '})(Sign);

const mapStateToProps = (state: Stores) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignForm);