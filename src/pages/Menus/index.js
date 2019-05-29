import React, { Component } from 'react';
import { Table, Button, Icon, Row, Col } from 'antd';
import Request from '../../utils/Request';
import style from './index.scss';

export default class index extends Component {
  state = {
    cart: [],
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
        this.setState({
          menus: res.data
        });
      }
    });
  };

  renderMenusTable() {
    const columns = [
      {
        key: 'size',
        title: '尺寸',
        dataIndex: 'size',
        render: (text, record) => {
          // console.log(record);
          if (record.price) {
            return <span>{text}</span>;
          }
          return {
            children: <strong>{text}</strong>,
            props: {
              colSpan: 2
            }
          };
        }
      },
      {
        key: 'price',
        title: '价格',
        dataIndex: 'price',
        render: (text, record) => {
          return <span>{text}</span>;
        }
      },
      {
        key: 'action',
        title: '加入',
        render: (text, record) => {
          const obj = {
            children: (
              <Button
                onClick={() => handleAddMenus(record)}
                className={style['add-btn']}
              >
                <Icon type="plus" />
              </Button>
            ),
            props: []
          };
          if (!record.price) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      }
    ];

    const handleAddMenus = record => {
      // console.log(record);
      // const { name, price, size } = record;

      let { cart } = this.state;
      const index = cart.findIndex(item => item.key === record.key);
      // console.log(index);
      index >= 0
        ? cart.splice(index, 1, {
            ...cart[index],
            count: cart[index].count + 1
          })
        : (cart = [
            ...cart,
            {
              ...record,
              count: 1
            }
          ]);

      // 存储到状态中
      this.setState({
        cart
      });
    };

    let data = this.state.menus;

    // 处理数据格式
    let dataSource = [];
    for (const key in data) {
      // console.log(data[item]);
      let item = data[key];
      dataSource.push({
        key: item.name,
        size: item.name
      });
      item.options.forEach((ele, index) => {
        dataSource.push({ ...ele, name: item.name, key: key + '-' + index });
      });
    }
    // console.log(dataSource);

    return (
      <Table
        pagination={false}
        className="menus-table"
        dataSource={dataSource}
        columns={columns}
      />
    );
  }
  renderCartTable() {
    const columns = [
      {
        key: 'count',
        title: '数量',
        dataIndex: 'count',
        render: (text, record) => (
          <span>
            <Button
              onClick={() => handleDecrease(record)}
              className={style['cart-btn']}
            >
              -
            </Button>
            <span>{record.count}</span>
            <Button
              onClick={() => handleIncrease(record)}
              className={style['cart-btn']}
            >
              +
            </Button>
          </span>
        )
      },
      {
        key: 'name',
        title: '菜单',
        dataIndex: 'name'
      },
      {
        key: 'price',
        title: '价格',
        dataIndex: 'price'
      }
    ];
    // 减
    const handleDecrease = record => {
      // cart 数据
      let { cart } = this.state;
      // 获取当前点击的数据的下标
      const index = cart.findIndex(item => item.key === record.key);
      // 当前点击的数据对象
      const current = cart[index];
      // console.log(current);
      // 当前数量小于等于1时, 购物车的商品移除掉 否则商品数量减1
      if (current.count <= 1) {
        cart.splice(index, 1);
      } else {
        cart.splice(index, 1, {
          ...current,
          count: current.count - 1
        });
      }
      // 更新状态
      this.setState({
        cart
      });
    };
    // 加
    const handleIncrease = record => {
      // cart 数据
      let { cart } = this.state;
      // 获取当前点击的数据的下标
      const index = cart.findIndex(item => item.key === record.key);
      // 当前点击的数据对象
      const current = cart[index];
      // console.log(current);
      // 商品数量+1

      cart.splice(index, 1, {
        ...current,
        count: current.count + 1
      });

      // 更新状态
      this.setState({
        cart
      });
    };

    return (
      <Table
        pagination={false}
        className="menus-table cart"
        dataSource={this.state.cart}
        columns={columns}
        locale={{
          emptyText: '购物车没有任何商品'
        }}
      />
    );
  }

  render() {
    const totalPrice = this.state.cart.reduce(
      (total, item) => (total += item.price * item.count),
      0
    );
    return (
      <Row>
        <Col sm={24} md={16}>
          {this.renderMenusTable()}
        </Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={style['total-price']}>总价: {totalPrice}</p>
          <Button type="primary" className={style['submit-btn']}>
            提交
          </Button>
        </Col>
      </Row>
    );
  }
}
