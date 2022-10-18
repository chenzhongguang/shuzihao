import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserReg from "../views/UserReg.vue"; //登录
import Perponalcenter from "@/views/personal/perPonalcenterview.vue";
import Publish from "../views/Creation/Publish.vue"; //文章发布
import Videoclip from "../views/Creation/VideoclipView.vue"; //视频
import Headline from "../views/Creation/HeadlineView.vue"; //微头条
import Frequency from "../views/Creation/FrequencyView.vue"; //音频
import Questions from "../views/Creation/QuestionsView.vue"; //问答
import MessAge from "../views/Message/MessageView.vue"; // 消息
import AticleDetail from "@/views/AticleDetail.vue";
import { title } from "process";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/reg",
    meta: { title: "登录" },
    children: [
      {
        //主页
        path: "first",
        meta: { title: "first" },
        component: () => import("../views/FirstView.vue"),
      },
      {
        //作品管理
        path: "sample",
        meta: { title: "sample" },
        component: () => import("../views/Administrtion/SampleView.vue"),
        children: [
          {
            //全部
            path: "",
            component: () => import("@/components/Owncontent/AllView.vue"),
          },
          {
            //文章
            path: "artcle",
            component: () => import("@/components/Owncontent/ArticleView.vue"),
          },
          {
            //视频
            path: "video",
            component: () => import("@/components/Owncontent/VideoView.vue"),
          },
          {
            //微消息
            path: "new",
            component: () => import("@/components/Owncontent/NewView.vue"),
          },
          {
            //问答
            path: "question",
            component: () => import("@/components/Owncontent/QuestionView.vue"),
          },
          {
            //小视频
            path: "xiaovideo",
            component: () => import("@/components/Owncontent/XiaoVideo.vue"),
          },
          {
            //音频
            path: "audio",
            component: () => import("@/components/Owncontent/AudioView.vue"),
          },
          {
            //全集
            path: "gather",
            component: () => import("@/components/Owncontent/GatherView.vue"),
          },
          {
            //草稿箱
            path: "draft",
            component: () => import("@/components/Owncontent/DraftView.vue"),
          },
        ],
      },
      {
        //消息
        path: "message",
        meta: { title: "message" },
        component: () => import("../views/Message/MessageView.vue"),
      },
      {
        //评论管理
        path: "comment",
        name: "comment",
        meta: { title: "comment" },
        component: () => import("../views/Administrtion/CommentView.vue"),
      },
      {
        //收益数据
        path: "earnings",
        name: "earnings",
        meta: { title: "earnings" },
        component: () => import("../views/Data/EarningsView.vue"),
        children: [
          {
            //整体数据
            path: "",
            component: () => import("@/components/Ldata/MyFramer.vue"),
          },
          {
            //创作收益
            path: "benefits",
            name: "benefits",
            component: () => import("@/components/Ldata/MyEntirety.vue"),
            children: [
              {
                path: "",
                component: () => import("@/views/Graph/TotalView.vue"),
              },
              {
                path: "articlegraph",
                component: () => import("@/views/Graph/ArticleGraph.vue"),
              },
              {
                path: "videoGraph",
                component: () => import("@/views/Graph/VideoGraph.vue"),
              },
            ],
          },
        ],
      },
      {
        //作品数据
        path: "production",
        meta: { title: "production" },
        component: () => import("../views/Data/ProductionView.vue"),
        children: [
          {
            path: "",
            component: () => import("../components/WriteData/AllData.vue"),
          },
          {
            path: "signle",
            meta: { title: "signle" },
            component: () => import("../components/WriteData/MySingle.vue"),
          },
        ],
      },
      {
        //粉丝数据
        path: "bean",
        meta: { title: "bean" },
        component: () => import("../views/Data/BeanView.vue"),
        children: [
          {
            path: "",
            component: () => import("../components/WriteData/ShowData.vue"),
          },
          {
            path: "followers",
            meta: { title: "followers" },
            component: () => import("../components/WriteData/followers.vue"),
          },
        ],
      },
      {
        //创作权益
        path: "equity",
        meta: { title: "equity" },
        component: () => import("../views/Grow/EquityView.vue"),
      },
      {
        //图片素材
        path: "material",
        meta: { title: "material" },
        component: () => import("../views/Tool/MaterialView.vue"),
      },
      {
        //设置
        path: "set",
        meta: { title: "set" },
        component: () => import("../views/Set/SetView.vue"),
        children: [
          {
            //账号详情
            path: "",
            component: () => import("../components/AccountView.vue"),
          },
          {
            //功能设置
            path: "future",
            component: () => import("../components/FutureView.vue"),
            meta: { title: "future" },
          },
        ],
      },
    ],
  },
  {
    // 文章详情
    path: "/articledetail",
    component: AticleDetail,
    meta: { title: "文章详情" },
  },
  {
    // 文章
    path: "/ownarticle",
    meta: { title: "ownarticle" },
    component: () => import("../components/Ownarticle/ownarticleView.vue"),
  },
  {
    // 消息
    path: "/message",
    component: MessAge,
    meta: { title: "message" },
  },
  {
    // 视频
    path: "/videoclip",
    component: Videoclip,
    meta: { title: "videoclip" },
  },
  {
    // 微头条
    path: "/headline",
    component: Headline,
    meta: { title: "headline" },
  },
  {
    // 问答
    path: "/questions",
    component: Questions,
    meta: { title: "questions" },
  },
  {
    // 音频
    path: "/frequency",
    component: Frequency,
    meta: { title: "frequency" },
  },
  {
    //个人中心
    path: "/personalcenter",
    component: Perponalcenter,
    meta: { title: "personalcenter" },
  },
  {
    //文章
    path: "/publish",
    component: Publish,
    meta: { title: "publish" },
  },
  {
    // 登录
    path: "/reg",
    component: UserReg,
    meta: { title: "reg" },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 前置路由守卫
// 路由导航守卫 说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to 要去的路由信息
// from 来自哪里的路由信息
// next 放行方法
router.beforeEach((to, from, next) => {
  // beforeEach 每次之前
  const uid = window.localStorage.getItem("uid");
//   if (to.meta.isAuth) {
//     //判断是否需要鉴权
//     if (localStorage.getItem("uid") === "1") {
//       next();
//     } else {
//       alert("未登录，无权限查看！");
//     }
//   } else {
//     next();
//   }
  // 校验非登录页面的登录状态
  if (to.path === "/reg") {
    // 登录页面 正常允许通过
    next();
  } else {
    if (uid) {
      // 已登录 允许通过
      next();
    } else {
      // 没有登录 跳转到登录页面
      next("/reg");
    }
  }
});
// 后置路由守卫
router.afterEach((to, from) => {
//   console.log("afterEach", to, from);
  const title = to.meta.title as unknown as string;
  if (title) {
    // 设置为 标签栏的题目
    document.title = title;
  } else {
    document.title = "projectg";
  }
});

export default router;
