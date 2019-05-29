import React, { Component } from 'react';
import { Tabs } from 'antd';
import style from './index.scss';
import { Switch } from 'dva/router';
import SubRoutes, { RedirectRoute } from '../../utils/SubRoutes';

const { TabPane } = Tabs;

export default class index extends Component {
  // 点击tab切换路由
  handleChangeTab = key => {
    // console.log(key);
    // window.location.href = '/#' + key;
    // console.log(this);
    if (this.props.location.pathname !== key) {
      this.props.history.push(key);
    }
  };
  render() {
    const { routes, app } = this.props;
    return (
      <div className={style.about}>
        <Tabs
          className={style.tabs}
          tabPosition={'left'}
          activeKey={this.props.location.pathname}
          onChange={this.handleChangeTab}
        >
          <TabPane tab="历史订餐" key="/about/history" />
          <TabPane tab="联系我们" key="/about/contact" />
          <TabPane tab="点餐文档" key="/about/orderingguide" />
          <TabPane tab="快递信息" key="/about/delivery" />
        </Tabs>
        <div className={style.routes}>
          {/* 二级路由 */}
          <Switch>
            {routes.map((route, i) => (
              // 调用封装组件
              <SubRoutes key={i} {...route} app={app} />
            ))}

            <RedirectRoute exact={true} from={'/about'} routes={routes} />
          </Switch>
        </div>
      </div>
    );
  }
}
