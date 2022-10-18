"use strict";
const svgCaptcha = require("svg-captcha");

const Controller = require("egg").Controller;

class HomeController extends Controller {
  //获取收益数据
  async creationdata() {
    const { ctx } = this;
    let res = { code: 1, msg: "获取数据成功" };
    const data = ctx.query;
    const day = data.day / 1;
    const id = ctx.session.uid;
    // console.log(id);
    const results = await this.app.mysql.select("creates", {
      // 搜索 post 表
      where: { uid: id }, // WHERE 条件
      columns: [
        "addtime",
        "total",
        "createarn",
        "basearn",
        "subsidy",
        "other",
        "video",
        "videobasearn",
        "videosubsidy",
        "othervideo",
      ], // 要查询的表字段
      orders: [["cid", "desc"]], // 排序方式
      limit: day, // 返回数据量
    });
    console.log(results);

    // => SELECT `author`, `title` FROM `posts`
    //   WHERE `status` = 'draft' AND `author` IN('author1','author2')
    //   ORDER BY `created_at` DESC, `id` DESC LIMIT 0, 10;

    // console.log(data);
    ctx.body = results;
  }
  // 获取用户名称数据
  async username() {
    const { ctx } = this;
    let res = { code: 1, msg: "获取数据成功" };
    const data = ctx.query;
    const s = data.input2;
    // SELECT u.uid, u.username, u.avater, u.fans, u.attention, u.introduce FROM attention AS a, users AS u WHERE a.uid=u.uid AND a.auid=1 AND u.username LIKE '%1%' AND u.uid!=1;
    let sql = `SELECT u.uid, u.username, u.avatar, u.fans, u.attention, u.introduce FROM attention AS a, users AS u WHERE a.uid=u.uid AND a.auid=${ctx.session.uid} AND u.username LIKE '${s}%' AND u.uid!=${ctx.session.uid} limit 0,1`;
    const results = await this.app.mysql.query(sql);
    if(results == ''){
      let sql = `SELECT u.uid, u.username, u.avatar, u.fans, u.attention, u.introduce FROM users AS u WHERE u.username LIKE '${s}%' AND u.uid!=${ctx.session.uid} limit 0,1`;
      const results = await this.app.mysql.query(sql);
      ctx.body = {results,code: 0};
    }else if (results != '') {
      ctx.body = {results,code:1};
    }
  }

  // 文章评论数据的获取
  async comments() {
    const { ctx } = this;
    const data = ctx.query;
    console.log(data);
    const results = await this.app.mysql.query(`SELECT c.content,c.cid,c.addtimes,c.aid, u.username, u.avatar FROM comments AS c, users AS u WHERE c.aid = ${data.aid} and c.uid=u.uid and c.status = 1`)
    ctx.body = results;
  }


  // 获取一个文章的详情信息
  async articleinfo() {
    const { ctx } = this;
    const data = ctx.query;
    console.log(data);
    const results = await this.app.mysql.query(`SELECT * FROM articles WHERE aid = ${data.aid}`);
    ctx.body = results;
  }
}

module.exports = HomeController;
