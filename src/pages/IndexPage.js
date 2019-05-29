import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';

// 引入路由需要的组件
import { Switch } from 'dva/router';
import SubRoutes, { RedirectRoute, NoMatchRoute } from '../utils/SubRoutes';

import NavBar from './NavBar';
// import Home from './Home';
// import About from './About';
// import Admin from './Admin';
// import Menus from './Menus';
// import Login from './User/Login';
// import Register from './User/Register';
import styles from './IndexPage.scss';

const { Header, Content } = Layout;

function IndexPage(props) {
  // console.log('IndexPage.js');

  // console.log(props);
  const { routes, app } = props;
  // console.log(routes);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <NavBar {...props} />
      </Header>

      <Content className={styles.content}>
        {/* 一级路由 */}
        <Switch>
          {/* <Route path="/home" component={Home} />
          <Route path="/menus" component={Menus} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} /> */}
          {routes.map((route, i) => (
            // 调用封装组件
            <SubRoutes key={i} {...route} app={app} />
          ))}
          {/*  
              重定向方式：
              如果路由配置中没有redirect: true（通过循环渲染重定向）
              则默认第一个路由为重定向路由
              <Redirect exact from={"/"} to={routes[0].path} /> 
             */}
          {/* <Redirect to="/home" /> */}
          <RedirectRoute exact={true} from={'/'} routes={routes} />
          {/* 输入的链接不存在时,跳转到NoMatch组件中 */}
          <NoMatchRoute />
        </Switch>
      </Content>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
