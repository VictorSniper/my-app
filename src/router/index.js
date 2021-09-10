import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout";
const routes = [
  {
    path: "/login",
    name: "login",
    index: "login",
    icon: "el-icon-user-solid",
    component: () => import("@/views/login"),
    meta: { title: "登录", roles: ["admin", "user"] },
  },
  {
    path: "/",
    name: "首页",
    index: "layout",
    icon: "el-icon-s-help",
    hidden: false,
    disabled: true,
    redirect: "/overview/analysis",
    component: Layout,
    children: [
      {
        path: "/overview",
        name: "工作台",
        index: "overview",
        redirect: "/overview/analysis",
        key: "1",
        component: () => import("@/views/overview"),
        meta: {
          title: "工作台",
          roles: ["admin", "edit"],
          type: "submenu",
          hidden: false,
          icon: "el-icon-monitor",
          index: "/overview",
        },
        children: [
          {
            path: "/overview/analysis",
            name: "数据分析",
            index: "overviewAnalysis",
            key: "1-1",
            component: () => import("@/views/overview/analysis"),
            meta: {
              title: "数据分析",
              roles: ["admin", "edit"],
              type: "item",
              hidden: false,
              icon: "",
              index: "/overview/analysis",
            },
          },
          {
            path: "/overview/monitor",
            name: "数据监控",
            index: "overviewMonitor",
            key: "1-2",
            component: () => import("@/views/overview/monitor"),
            meta: {
              title: "数据监控",
              roles: ["admin", "edit"],
              type: "item",
              hidden: false,
              icon: "",
              index: "/overview/monitor",
            },
          },
          {
            path: "/overview/error",
            name: "403",
            index: "overviewError",
            key: "1-3",
            component: () => import("@/views/error"),
            meta: { title: "没有权限", roles: ["admin"] },
          },
        ],
      },
      {
        path: "/basic",
        name: "基础管理",
        index: "basic",
        redirect: "/basic/dictionary",
        key: "2",
        component: () => import("@/views/basic"),
        meta: {
          title: "基础管理",
          roles: ["admin"],
          type: "submenu",
          hidden: false,
          icon: "el-icon-notebook-1",
          index: "/basic",
        },
        children: [
          {
            path: "/basic/dictionary",
            name: "数据字典",
            index: "basicDictionary",
            key: "2-1",
            component: () => import("@/views/basic/dictionary"),
            meta: {
              title: "数据字典",
              roles: ["admin"],
              type: "item",
              hidden: false,
              icon: "",
              index: "/basic/dictionary",
            },
            children: [
              {
                path: "/basic/dictionary/edit",
                name: "编辑",
                index: "basicDictionaryEdit",
                key: "2-1-1",
                component: () => import("@/views/basic/dictionary/edit"),
                meta: {
                  title: "编辑",
                  roles: ["admin"],
                  type: "item",
                  hidden: true,
                  icon: "",
                  index: "/basic/dictionary",
                },
              },
              {
                path: "/basic/dictionary/details",
                name: "详情",
                index: "basicDictionaryDetails",
                key: "2-1-2",
                component: () => import("@/views/basic/dictionary/details"),
                meta: {
                  title: "详情",
                  roles: ["admin"],
                  type: "item",
                  hidden: true,
                  icon: "",
                  index: "/basic/dictionary",
                },
              },
            ],
          },
          {
            path: "/basic/category",
            name: "目录分类",
            index: "basicCategory",
            key: "2-2",
            component: () => import("@/views/basic/category"),
            meta: {
              title: "目录分类",
              roles: ["admin"],
              type: "item",
              hidden: false,
              icon: "",
              index: "/basic/category",
            },
          },
        ],
      },
      {
        path: "/article",
        name: "文章管理",
        index: "article",
        redirect: "/article/idiomstory",
        key: "3",
        component: () => import("@/views/article"),
        meta: {
          title: "文章管理",
          roles: ["admin"],
          type: "submenu",
          hidden: false,
          icon: "el-icon-tickets",
          index: "/article",
        },
        children: [
          {
            path: "/article/idiomstory",
            name: "成语故事",
            index: "articleIdiomstory",
            key: "3-1",
            component: () => import("@/views/article/idiomstory"),
            meta: {
              title: "成语故事",
              roles: ["admin"],
              type: "item",
              hidden: false,
              icon: "",
              index: "/article/idiomstory",
            },
            children: [
              {
                path: "/article/idiomstory/details",
                name: "成语故事详情",
                index: "articleIdiomstoryDetails",
                key: "3-1-1",
                component: () => import("@/views/article/idiomstory/details"),
                meta: {
                  title: "成语故事详情",
                  roles: ["admin"],
                  type: "item",
                  hidden: true,
                  icon: "",
                  index: "/article/idiomstory",
                },
              },
            ],
          },
          {
            path: "/article/list",
            name: "文章分类",
            index: "articleList",
            key: "3-2",
            component: () => import("@/views/article/list"),
            meta: {
              title: "文章列表",
              roles: ["admin"],
              type: "item",
              hidden: false,
              icon: "",
              index: "/article/list",
            },
            children: [
              {
                path: "/article/list/details",
                name: "文章详情",
                index: "articleListDetails",
                key: "3-2-1",
                component: () => import("@/views/article/list/details"),
                meta: {
                  title: "文章详情1",
                  roles: ["admin"],
                  type: "item",
                  hidden: true,
                  icon: "",
                  index: "/article/list",
                },
              },
            ],
          },
        ],
      },
      {
        path: "/account",
        name: "帐户管理",
        index: "account",
        redirect: "/account/center",
        key: "4",
        component: () => import("@/views/account"),
        meta: {
          title: "帐户管理",
          roles: ["admin"],
          type: "submenu",
          hidden: false,
          icon: "el-icon-s-custom",
          index: "/account",
        },
        children: [
          {
            path: "/account/center",
            name: "帐户中心",
            index: "accountCenter",
            key: "4-1",
            component: () => import("@/views/account/center"),
            meta: {
              title: "帐户中心",
              roles: ["admin"],
              type: "item",
              hidden: false,
              icon: "el-icon-s-custom",
              index: "/account/center",
            },
          },
          {
            path: "/account/settings",
            name: "帐户设置",
            index: "accountSettings",
            key: "4-2",
            component: () => import("@/views/account/settings"),
            meta: {
              title: "帐户设置",
              roles: ["admin"],
              type: "item",
              hidden: false,
              icon: "el-icon-monitor",
              index: "/account/settings",
            },
          },
        ],
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const LOGIN_PAGE_NAME = "login";
const role = "admin";
router.beforeEach((to, from, next) => {
  const token = {
    accessToken: window.localStorage.getItem("token"),
  };
  if (!token.accessToken && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME, // 跳转到登录页,
      query: {
        redirect: "/login",
      },
    });
  } else if (!token.accessToken && to.name === LOGIN_PAGE_NAME) {
    next(); //放行
  } else if (token.accessToken && to.name === LOGIN_PAGE_NAME) {
    next({
      name: "首页",
    });
  } else {
    if (to.meta.roles && !to.meta.roles.includes(role)) {
      console.log("没有权限");
      next({
        name: "403",
      });
    } else {
      next(); //放行
    }
  }
});
export default router;
