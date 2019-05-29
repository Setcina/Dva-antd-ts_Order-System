import React, { Component } from 'react';
import { Table, Button, Row, Col, Message } from 'antd';
import Request from '../../utils/Request';
import NewPizza from './NewPizza';
import style from './index.scss';

export default class index extends Component {
  state = {
    menus: []
  };

  // 钩子函数
  componentDidMount() {
    this.getMenusData();
  }

  // 获取菜单列表的数据
  getMenusData = () => {
    Request('/menu.json').then(res => {
      // console.log(res);
      if (res && res.status === 200 && res.data) {
        const { data } = res;
        this.setState(() => {
          const menus = [];
          for (const key in data) {
            menus.push({
              key: key,
              name: data[key].name
            });
          }
          return { menus };
        });
      }
    });
  };

  renderMenuTable() {
    const columns = [
      {
        key: 'name',
        title: '品种',
        dataIndex: 'name'
      },
      {
        key: 'action',
        title: '删除',
        render: (text, record) => (
          <Button
            onClick={() => handleDelete(record)}
            className={style['del-btn']}
          >
            <span>x</span>
          </Button>
        )
      }
    ];

    const handleDelete = record => {
      Request(`/menu/${record.key}.json`, {
        method: 'delete'
      }).then(res => {
        // console.log(res);
        if (res && res.status === 200) {
          Message.success('删除成功');
          window.location.href = '/#/menus';
        } else {
          Message.error('删除失败');
        }
      });
    };

    // const dataSource = [
    //   {
    //     key: 1,
    //     name: 'pizza'
    //   }
    // ];

    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={this.state.menus}
        columns={columns}
        locale={{
          emptyText: '菜单没有任何商品'
        }}
      />
    );
  }

  renderNewPizza() {
    return <NewPizza />;
  }

  render() {
    return (
      <Row className={style.admin}>
        <Col sm={24} md={16} className={style.left}>
          {this.renderNewPizza()}
        </Col>
        <Col sm={24} md={8} className={style.right}>
          <h3>菜单</h3>
          {this.renderMenuTable()}
        </Col>
      </Row>
    );
  }
}
