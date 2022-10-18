'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户登陆
   router.post('/userlogin', controller.user.userlogin);
  // 用户注册
  router.post('/reg', controller.user.reg);
  //获取收益数据
  router.get('/creationdata', controller.data.creationdata);
  // 用户名称搜索
  router.get('/username', controller.data.username);
  // 获取粉丝和关注人数
  router.get('/getbean', controller.user.getbean);
  // 关注用户
  router.post('/attentionTrue', controller.attention.attentionTrue);
  // 取消关注用户
  router.post('/attentionFalse', controller.attention.attentionFalse);
  // 文章评论数据的获取
  router.get('/comments', controller.data.comments);
  // 用户文章获取
  router.get('/articleData', controller.article.list);
  // 获取一个文章详情信息
  router.get('/articleinfo', controller.data.articleinfo);
  // f
  // 获取作品数据里面数据(文章列表)
  router.get('/addtmelist', controller.arlist.addtmelist);
  router.get('/moredata', controller.arlist.moredata);
  router.get('/opusdata', controller.arlist.opusdata);
  router.get('/getgenderdata', controller.arlist.getgenderdata);


  // 获取用户信息
  router.get('/userinfo', controller.user.userinfo);
  // 获取收益数据
  router.get('/creationdata', controller.data.creationdata);
  // 编辑器图片显示
  router.post('/upload', controller.article.upload);
  // 用户发布文章
  router.post('/publish', controller.article.publish);
  // 获取文章列表草稿1
  router.get('/issuefalse',  controller.article.issuefalse);
  // 获取文章草稿2
  router.get('/draftarticle',  controller.article.draftarticle);
  // 修改文章
  router.post('/editarticle',  controller.article.editarticle);
  // 删除文章
  router.get('/delarticle', controller.article.del);
  // 获取文章
  router.get('/alist', controller.article.list);
  // 获取文章排序
  router.get('/articledesc', controller.article.articledesc);
  // 获取文章详情
  router.get('/adetail', controller.article.adetail);
  // 获取活动
  router.get('/action', controller.article.action);
  // 获取收益数据
  router.get('/creationdata', controller.data.creationdata);
  // 用户名称搜索
  router.get('/username', controller.data.username);
  //设置用户名、简介、邮箱
  router.post('/replace', controller.userinfo.replace);
  //一进页面就判断
  router.get('/replaces', controller.userinfo.replaces);
  //修改性别
  router.post('/place', controller.userinfo.place);
  //头像上传
  router.post('/upload', controller.userinfo.upload);
  //图片素材
  router.post('/uploads', controller.picturelist.uploads);
  //判断图片素材是否有图片
  router.get('/pict', controller.picturelist.pict);
  //删除图片
  router.post('/del', controller.picturelist.del);

};
