"use strict";

const Controller = require("egg").Controller;
class HomeController extends Controller {
  // 关注用户
  async attentionTrue() {
    const { ctx } = this;
    let res = { code: 1, msg: "关注成功" };
    const data = ctx.query;
    const result = await this.app.mysql.insert("attention", {
      uid: data.uid,
      auid: ctx.session.uid,
    }); // 在 post 表中，插入 title 为 Hello World 的记录
    // => INSERT INTO `posts`(`title`) VALUES('Hello World');
    console.log(result);
    ctx.body = res;
  }
  // 取消关注用户
  async attentionFalse() {
    const { ctx } = this;
    let res = { code: 1, msg: "取消关注成功" };
    const data = ctx.query;
    console.log(data);
    const fans = await this.app.mysql.query(
      `SELECT u.uid, u.username, u.avater, u.fans, u.attention, u.introduce FROM attention AS a, users AS u WHERE a.uid=u.uid AND a.auid=${ctx.session.uid}`
    );
    ctx.body = res;
  }
}

module.exports = HomeController;
