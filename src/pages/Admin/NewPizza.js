import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'antd';
import Request from '../../utils/Request';

const { TextArea } = Input;

class NewPizza extends Component {
  handleSubmit = () => {
    // console.log(this.props.form);
    this.props.form.validateFields((err, value) => {
      // console.log(value);
      if (!err) {
        const { name, description, size1, price1, size2, price2 } = value;
        let data = {
          name,
          description,
          options: [
            {
              size: size1,
              price: price1
            },
            {
              size: size2,
              price: price2
            }
          ]
        };
        // 网络请求
        Request('/menu.json', {
          method: 'post',
          data
        }).then(res => {
          if (res && res.status === 200 && res.data) {
            Message.success('添加成功');
            window.location.href = '/#/menus';
          } else {
            Message.error('添加失败');
          }
        });
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      },
      colon: false
    };

    const { getFieldDecorator } = this.props.form;
    const required = true;

    return (
      <div>
        <h3>添加新的pizza @@</h3>
        <Form>
          <Form.Item {...formItemLayout} label="品种">
            {getFieldDecorator('name', {
              rules: [
                {
                  required,
                  message: '请输入品种'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="描述">
            {getFieldDecorator('description')(<TextArea />)}
          </Form.Item>
          <p>
            <strong>选项1:</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator('size1', {
              rules: [
                {
                  required,
                  message: '请输入尺寸'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="价格">
            {getFieldDecorator('price1', {
              rules: [
                {
                  required,
                  message: '请输入价格'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <p>
            <strong>选项2:</strong>
          </p>
          <Form.Item {...formItemLayout} label="尺寸">
            {getFieldDecorator('size2', {
              rules: [
                {
                  required,
                  message: '请输入尺寸'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="价格">
            {getFieldDecorator('price2', {
              rules: [
                {
                  required,
                  message: '请输入价格'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item>
            <Button
              onClick={this.handleSubmit}
              type="primary"
              className="btn-w-p100"
            >
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(NewPizza);
