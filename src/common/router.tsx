import React, { ComponentType, lazy, ReactNode, Suspense } from "react";
import { Spin } from "antd";
import { createHashHistory } from "history";
import {
  ContainerOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  RadarChartOutlined,
  SmileOutlined,
  SolutionOutlined,
  PieChartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
/** @jsx jsx */
import { jsx } from '@emotion/react';

const Loading = (
  <Spin
    size="large"
    css={{
      width: "100%",
      margin: "40px 0",
    }}
  />
);

export const history = createHashHistory();

export const load = <T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) => {
  const Comp = lazy(factory);

  return (props: any) => (
    <Suspense fallback={Loading}>
      <Comp {...props} />
    </Suspense>
  );
};

export interface IRouter {
  path: string;
  redirect?: string;
  component?: ComponentType<any>;
  icon?: ReactNode;
  routes?: IRouter[];
  name?: string;
  authority?: string[];
  target?: string;
}

export const routes: IRouter[] = [
  {
    path: "/auth",
    component: load(() => import("../layouts/UserLayout")),
    routes: [
      {
        name: "登录",
        path: "/auth/login",
        component: load(() => import("../pages/auth/login")),
      },
      {
        name: "注册",
        path: "/auth/register",
        component: load(() => import("../pages/auth/register")),
      },
    ],
  },
  {
    path: "/",
    component: load(() => import("../layouts/SecurityLayout")),
    routes: [
      {
        path: "/",
        component: load(() => import("../layouts/BasicLayout")),
        routes: [
          {
            path: "/home",
            name: "首页",
            icon: <HomeOutlined />,
            // authority: [],
            routes: [
              {
                path: "/home/manage",
                name: "首页管理",
                component: load(() => import("../pages/home/Home")),
              },
              {
                path: "/home",
                redirect: "/home/manage",
              },
            ],
          },
          {
            path: "/chart",
            name: "图表",
            icon: <PieChartOutlined />,
            // authority: [],
            routes: [
              {
                path: "/chart/manage",
                name: "图表",
                component: load(() => import("../pages/charts/Chart")),
              },
              {
                path: "/chart",
                redirect: "/chart/manage",
              },
            ],
          },
          {
            path: "/table",
            name: "布局",
            icon: <ContainerOutlined />,
            // authority: [],
            routes: [
              {
                path: "/table/manage",
                name: "布局管理",
                component: load(() => import("../pages/table/Table")),
              },
              {
                path: "/table",
                redirect: "/table/manage",
              },
            ],
          },
          {
            path: "/",
            redirect: "/home",
          },
        ],
      },
      // {
      //   component: dynamicWrapper(app, [], () => import("../pages/NoFoundPage")),
      // },
    ],
  },
  // {
  //   component: dynamicWrapper(app, [], () => import("../pages/NoFoundPage")),
  // },
];
