import instance from "./http";
import { userRegisterI, userLoginI,userId, creation, articleI,editI,usernameI, attentionI,commentsI, articleinfoI, addtmeId,userSet, usersSet,avatupload, picSet, gendSet} from "./type";

//你就不能直接使用export  default  导出
//已经配置了baseUrl，所以这里直接写路由即可，不用 /api  userinfo:{username:'', passwd:''}
export const userRegister = (userinfo: userRegisterI) =>
    instance.post("/reg", userinfo);

//用户注册
export const userReg = (userinfo: userRegisterI) =>
    instance.post("/reg", userinfo);

// 用户登录
export const userLogin = (userinfo: userLoginI) =>
    instance.post("/userlogin", userinfo);

// 获取用户信息
export const userInfo = (uid:number)=>{
    return instance({
        method:"GET",
        url:"/userinfo",
        params:{uid}
    })
}

// 获取用户创作收益
export const creationdata = (creationdata: creation) => {
    return instance({
        method: "GET",
        url: "/creationdata",
        params: creationdata
    })
}
// 获取文章
export const articleData = () => {
    return instance({
      method: "GET",
      url: "/articleData",
    })
  }
  
  // 实现用户的搜索
  export const username = (username: usernameI) => {
    return instance({
      method: "GET",
      url: "/username",
      params: username
    })
  }
  
  
  // 获取粉丝和关注数据
  export const getbean = () => {
    return instance({
      method: "GET",
      url: "/getbean",
    })
  }
  
  // 关注用户
  export const attentionTrue = (attentionT: attentionI) => {
    return instance({
      method: "POST",
      url: "/attentionTrue",
      params: attentionT
  
    })
  }
  
  // 取消关注
  export const attentionFalse = (attentionF: attentionI) => {
    return instance({
      method: "POST",
      url: "/attentionFalse",
      params: attentionF
    })
  }
  
  // 获取文章评论
  export const comments = (comments:commentsI) => {
    return instance({
      method: "GET",
      url: "/comments",
      params: comments
    })
  }
  
  // 获取一个文章详情信息
  export const articleinfo = (articleinfo:articleinfoI)=>{
    return instance({
      method: "GET",
      url: "/articleinfo",
      params: articleinfo
    })
  }
// f
// 获取数据列表的数据，包含文章里面
export const articleDataList = (articleDataList: addtmeId) =>{
    return instance({
        method:"GET",
        url:"/addtmelist",
        params:articleDataList
    })
  }
  
  // 默认发起请求，拿到待更新里面的数据
  export const updataData = (updataData: addtmeId) =>{
    return instance({
        method:"GET",
        url:"/moredata",
        params:updataData
    })
  }
  
  // 获取单篇的数据
  export const getBeanData = (updataData: userId) =>{
    return instance({
        method:"GET",
        url:"/opusdata",
        params:updataData
    })
  }  
  
  // 获取性别、年龄数据
  export const getGender = (getGender: userId) =>{
    return instance({
        method:"GET",
        url:"/getgenderdata",
        params:getGender
    })
  } 
  


// 获取文章列表信息
export const articleList = (uid: number) => {
    return instance({
        method: "GET",
        url: "/alist",
        params:{uid}
    })
}
// 获取文章详情信息
export const articledetail = (aid: number) => {
    return instance({
        method: "GET",
        url: "/adetail",
        params:{aid}
    })
}

// 文章上传
export const publish = (articleIfon: articleI) => {
    return instance({
        method: "POST",
        url: "/publish",
        data: articleIfon
    })
}

// 获取草稿列表
export const issuefalse = (uid:number)=>{
    return instance({
        method:"GET",
        url:"/issuefalse",
        params:{uid}
    })
}
// 获取单篇草稿
export const draftarticle = (aid:number)=>{
    return instance({
        method:"GET",
        url:"/draftarticle",
        params:{aid}
    })
}
// 文章修改
export const editArticle = (edit: editI) => {
    return instance({
        method: "POST",
        url: "/editarticle",
        data: edit
    })
}

// 文章删除
export const delArticle = (aid: number) => {
    return instance({
        method: "GET",
        url: "/delarticle",
        params: {aid}
    })
}

// 获取活动信息
export const action = (status:number) => {
    return instance({
        method: "GET",
        url: "/action",
        params:{status}
    })
}

// 获取文章排行
export const articledesc = (status:number) => {
    return instance({
        method: "GET",
        url: "/articledesc",
        params:{status}
    })
}

// 消息获取
export const message = (uid:number) => {
    return instance({
        method: "GET",
        url: "/messagelist",
        params:{uid}
    })
}
//提交用户名、用户简介，用户邮箱
export const updateSet = (setinfo: userSet) =>{
  return instance({
      method:"POST",
      url:"/replace",
      params:setinfo
  })
}
//判断用户名、用户简介，用户邮箱等信息
export const updateSets = (setinfo: usersSet) =>{
  return instance({
      method:"GET",
      url:"/replaces",
      params:setinfo,
  })
}
//头像上传
export const avatarSet = (avatinfo: avatupload) =>{
  return instance({
      method:"POST",
      url:"/upload",
      params:avatinfo
  })
}
//图片素材上传
export const pictureInfo = (avatinfo: avatupload) =>{
  return instance({
      method:"POST",
      url:"/uploads",
      params:avatinfo
  })
}
//一进页面判断有没有图片
export const pictureSets = (setinfo: picSet) =>{
  return instance({
      method:"GET",
      url:"/pict",
      params:setinfo,
  })
}
//删除图片素材
export const deletePic = (setinfo: picSet) =>{
  return instance({
      method:"POST",
      url:"/del",
      params:setinfo,
  })
}
//修改性别
export const genderSet = (setinfo: gendSet) =>{
  return instance({
      method:"POST",
      url:"/place",
      params:setinfo,
  })
}

