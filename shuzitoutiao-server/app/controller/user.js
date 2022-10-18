"use strict";
const svgCaptcha = require("svg-captcha");

const Controller = require("egg").Controller;

class HomeController extends Controller {
  //注册
  async reg() {
    const { ctx } = this;
    let res = { code: 1, msg: "注册成功" };
    const data = ctx.request.body;
    console.log(data);
    // 去数据库拿数据对比
    const result = await this.app.mysql.get("users", { tel: data.tel1 });
    console.log(result);
    if (result == null) {
      // 存入数据
      await this.app.mysql.insert("users", {
        tel: data.tel1,
        passwd: data.password1,
        username: "创意10" + data.tel1,
        id: "1003" + data.tel1,
      });
      // 成功存入
      ctx.session.uid = result.uid;
      ctx.body = res;
      return;
    }
    if (result.passwd != data.password1) {
      ctx.body = { code: -1, msg: "已经注册，密码错误" };
    } else {
      ctx.body = { code: 0, msg: "已经注册，请登录" };
    }
  }
  // 登录
  async userlogin() {
    const { ctx } = this;
    const data = ctx.request.body;
    // console.log(data);
    const result = await this.app.mysql.get("users", { tel: data.tel });
    console.log(result);
    if (result == null) {
      ctx.body = { code: 0, msg: "没有注册，请注册" };
      return;
    } else if (data.passwd == result.passwd) {
      ctx.body = { code: 1, msg: "登录成功", uid: ctx.session.uid };
      ctx.session.uid = result.uid;
      ctx.session.tel = result.tel;
    } else {
      ctx.body = { code: -1, msg: "密码错误" };
    }
  }

  // 粉丝获取和关注
  async getbean() {
    const { ctx } = this;
    const data = ctx.request.body;
    console.log(data);
    console.log(ctx.session.uid);
    // 关注的人
    // SELECT u.* from attention AS a, users AS u WHERE a.uid=u.uid AND a.auid=ctx.session;
    const attention = await this.app.mysql.query(
      `SELECT u.uid, u.username, u.avatar, u.fans, u.attention, u.introduce FROM attention AS a, users AS u WHERE a.uid=u.uid AND a.auid=${ctx.session.uid}`
    );
    // 粉丝数据
    const fans = await this.app.mysql.query(
      `SELECT u.uid, u.username, u.avatar, u.fans, u.attention, u.introduce from fans AS f, users AS u WHERE f.uid=u.uid AND f.fuid=${ctx.session.uid}`
    );
    // console.log(attention);
    // console.log(fans);
    ctx.body = { fans, attention };
  }
  // 获取用户信息
  async userinfo() {
    const { ctx } = this;
    let data = ctx.request.query;
    console.log(data);
    const sql = `SELECT * FROM users WHERE uid=${data.uid}`;
    const result = await this.app.mysql.query(sql);
    console.log(result);
    if (!result) {
      result = { code: -1, msg: "对应的文章不存在" };
    }
    ctx.body = result;
  }
}

module.exports = HomeController;
