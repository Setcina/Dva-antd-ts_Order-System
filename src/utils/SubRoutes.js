import React from 'react';
import { Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from 'dva';
import NoMatch from '../components/NoMatch';

// export default function SubRoutes(route) {
//   console.log(route);
//   return (
//     <Route
//       render={props => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }

// 解决动态加载路由组件的方法

const dynamicCom = (app, models, component, routes, isAuthority, userInfo) =>
  dynamic({
    app,
    models: () => models,
    component: () =>
      component().then(res => {
        // console.log(isAuthority);
        if (isAuthority) {
          // 判断userInfo.id 是否有内容
          if (!localStorage.key || !localStorage.email) {
            return () => <Redirect to="/login" />;
          }
        }
        const Component = res.default || res;
        return props => <Component {...props} app={app} routes={routes} />;
      })
  });

function SubRoutes({ routes, component, app, model, isAuthority, userInfo }) {
  // console.log('subRoutes.js');

  return (
    <Route
      component={dynamicCom(
        app,
        model,
        component,
        routes,
        isAuthority,
        userInfo
      )}
    />
  );
}

// 重定向封装组件
export function RedirectRoute({ routes, from, exact }) {
  const routeR = routes.filter(item => {
    return item.redirect;
  });

  const to = routeR.length ? routeR[0].path : routes[0].path;
  return <Redirect exact={exact} from={from} to={to} />;
}

// NoMatchRoute
export function NoMatchRoute({ status = 404 }) {
  return <Route render={props => <NoMatch {...props} status={status} />} />;
}

// 链接
export default connect(({ global }) => ({
  userInfo: global.userInfo
}))(SubRoutes);
