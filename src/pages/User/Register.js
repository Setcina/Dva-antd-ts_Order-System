import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { email_reg, pwd_reg } from '../../utils/Regexp.js';
import Request from '../../utils/Request';
import Logo from 'Assets/icon.png';
import style from './account.scss';

class index extends Component {
  state = {
    email: '27732357000@qq.com'
  };
  // 自定义表单校验规则
  validatorForm = (rule, value, callback) => {
    if (value && rule.pattern && !value.match(rule.pattern)) {
      callback(rule.message);
    } else {
      callback();
    }
  };

  // 自定义校验两次密码是否一致
  validatorPwd = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue('pwd')) {
      callback(rule.message);
      return;
    }
    callback();
  };

  // submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(err);
      if (!err) {
        const { email, pwd } = values;
        // 发起网络请求
        Request('/users.json', {
          method: 'post',
          data: { email, pwd }
        }).then(res => {
          // console.log(res);
          if (res.status === 200 && res.data) {
            // console.log(this.props.history);
            this.props.history.push('/login');
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.account}>
        <img src={Logo} alt="my logo" className={style.logo} />
        <Form className="account-form">
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '邮箱不能为空, 请输入邮箱'
                },
                // {
                //   type: 'email',
                //   message: '请输入正确的邮箱格式, 如: 27732357@qq.com'
                // }
                {
                  pattern: email_reg,
                  validator: this.validatorForm,
                  message: '请输入正确的邮箱格式,如: 27732357@qq.com'
                }
              ]
              // initialValue: this.state.email
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空，请输入密码！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="请输入6-16位字母、数字或特殊字符的密码"
              />
            )}
          </Form.Item>
          <Form.Item label="确认密码">
            {getFieldDecorator('aPwd', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空，请输入密码！'
                },
                {
                  pattern: pwd_reg,
                  validator: this.validatorForm,
                  message:
                    '请输入正确的密码格式：6-16位字母、数字或特殊字符 _-.'
                },
                {
                  validator: this.validatorPwd,
                  message: '两次输入的密码不一致！'
                }
              ]
            })(
              <Input
                maxLength={16}
                type="password"
                placeholder="请输入确认密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button onClick={this.handleSubmit} className="btn" type="primary">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(index);
