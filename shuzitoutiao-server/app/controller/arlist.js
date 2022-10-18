'use strict';

const Controller = require('egg').Controller;

class ArlistController extends Controller {
    // 整体
    async moredata() {
        const { ctx } = this;
        const data = ctx.request.query;
        const sql = `select * from articles where uid = ${ctx.session.uid}`;
        const results = await this.app.mysql.query(sql);
        ctx.body = results;
    }

    // 拿性别数据
    async getgenderdata() {
        const { ctx } = this;
        const data = ctx.request.query;
        const sql01 = `SELECT u.gender,SUM(u.gender) as sumg from users AS u,fans AS f WHERE  u.uid = f.uid AND f.fuid=${data.uid} GROUP BY u.gender`
        const sql02 = ` SELECT u.old FROM users AS u,fans AS f WHERE u.uid = f.uid AND f.fuid =${data.uid}  group BY u.old`;
        const results3 = await this.app.mysql.query(sql02);
        
        console.log(results3);
      const results2 = await this.app.mysql.query(sql01);
        ctx.body = results2,results3;
    }

    async addtmelist() {
        const { ctx } = this;
        const data = ctx.request.query;
        const results = await this.app.mysql.select('articles', { // 搜索 post 表
            where: { uid: ctx.session.uid }, // WHERE 条件
            columns: ['addtime'], // 要查询的表字段
            orders: [['addtime', 'desc']], // 排序方式
            limit: data.amid/1, // 返回数据量
        });
        console.log(results);
        ctx.body = results;
    }
    
    // 单篇请求
    async opusdata() {
        const { ctx } = this;
        const data = ctx.request.query;
        const sql = `select a.aid,a.title,a.mainpic,a.impress,a.collects,a.reading,a.supports,a.comments,a.addtime from articles AS a,users AS u WHERE a.uid=${data.uid} and a.uid = u.uid `;
        const results = await this.app.mysql.query(sql);
        ctx.body = results;
    }
}

module.exports = ArlistController;
