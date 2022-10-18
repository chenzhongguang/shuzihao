'use strict';

const Controller = require('egg').Controller;
const fs = require("fs");
const path = require("path");

class articleController extends Controller {

    // 图片显示
    async upload() {
        const { ctx } = this;
        const file = ctx.request.files[0];
        const data = {
            "errno": 0,
            "data": {}
        }
        // console.log(file,'9999');
        fs.copyFileSync(file.filepath, path.dirname(__dirname) + '/public/uploads/' + path.basename(file.filepath))
        data.data.url = "http://127.0.0.1:81/public/uploads/" + path.basename(file.filepath);
        // data.data.alt = file.filename;
        console.log(data.data.url,11111);
        ctx.body = data;
    }
    // 文章发布
    async publish() {
        const { ctx } = this;
        let res = { code: 1, msg: "上传成功" };
        let data = ctx.request.body;
         // console.log(data,122);
        let imgUrl = data.mainpic.images;
        data.mainpic = imgUrl;
        data.uid = 1;    //ctx.session.uid
        const result = await this.app.mysql.insert('articles', data);
        // const result = await this.app.mysql.update('articles', data); // 更新 posts 表中的记录
        // console.log(result,321);
        if (!result.insertId) {
            res = { code: -1, msg: '添加失败' };
        }
        ctx.body = res;
    }
    // 文章编辑
     async editarticle() {
        const { ctx } = this;
        let res = { code: 1, msg: '操作成功' };
        const data = ctx.request.body;
        // console.log(data,1111);
        let imgUrl = data.mainpic.images;
        data.mainpic = imgUrl;
        const aid = data.aid;
        delete data.aid;
        const options = {
            where: {
              aid,
              uid:1,//只能修改自己发布的文章ctx.session.uid
            }
          };
        const result = await this.app.mysql.update('articles', data, options);
        // console.log(result,321);
        if (!result.affectedRows) {
            res = { code: -1, msg: '操作失败' };
        }
        ctx.body = res;
    }
    // 文章删除
    async del() {
            const { ctx } = this;
            let res = { code: 1, msg: '操作成功' };
            //接收客户端提交上来的GET数据
            const aid = ctx.request.query.aid;
            const sql = `UPDATE articles SET status = -1 WHERE articles.aid = ${aid}`;
            const result = await this.app.mysql.query(sql);
            // console.log(result,'del');
            if (!result.affectedRows) {
                res = { code: -1, msg: '操作失败' };
            }
            ctx.body = res;
        }

    // 文章列表
    async list() {
        const { ctx } = this;
        let res = { code: 1, msg: '获取成功' };
        let data = ctx.request.query;
        console.log('111',data);
        //到数据表里面去验证数据的正确性 
        const sql1 = `SELECT SUM(supports) AS sups, SUM(reading) AS rds FROM articles WHERE uid = ${ctx.session.uid}`;
        const sql2 = `SELECT SUM(earn) AS earn FROM (SELECT createarn+basearn+subsidy+other as earn FROM creates WHERE creates.uid=1 GROUP BY cid) AS c ;`;
        const sql3 = `SELECT articles.*,users.* FROM articles,users WHERE articles.uid = ${ctx.session.uid} and articles.status = 1 and articles.uid = users.uid`;
        const result = await this.app.mysql.query(sql1);
        const result2 = await this.app.mysql.query(sql2);
        const result3 = await this.app.mysql.query(sql3);
        console.log(6666,result2);
        if (!result) {
            res = { code: -1, msg: '获取失败' };
        }
        res.auser = result;
        res.earn = result2;
        res.articleList = result3;
        ctx.body = res;
    }

     // 文章详情
    async adetail() {
        const { ctx } = this;
        let res = { code: 1, msg: '获取成功' };
        let data = ctx.request.query;
        // console.log('adetail',data);
        const sql = `SELECT articles.*,users.* FROM articles,users WHERE articles.aid = ${data.aid} and articles.uid = users.uid`;
        const result = await this.app.mysql.query(sql);
        // console.log(6666,result);
        if (!result) {
            res = { code: -1, msg: '获取失败' };
        }
        res.aInfo = result;
        ctx.body = res;
    }

     // 活动列表
    async action() {
        const { ctx } = this;
        let res = { code: 1, msg: '获取成功' };
        let data = ctx.request.query;
        // console.log('111',data);
        //到数据表里面去验证数据的正确性 
        const sql = `SELECT * FROM actions WHERE actions.status = ${data.status}`;
        const result = await this.app.mysql.query(sql);
        // console.log(6666,result);
        if (!result) {
            res = { code: -1, msg: '获取失败' };
        }
        res.action = result;
        ctx.body = res;
    }

    // 文章排行
    async articledesc() {
        const { ctx } = this;
        let res = { code: 1, msg: '获取成功' };
        let data = ctx.request.query;
        // console.log('111',data);
        const sql = `SELECT articles.aid, articles.title, articles.mainpic,users.username,users.avatar FROM articles,users WHERE articles.uid=users.uid AND articles.status = 1 order by reading desc`;
        const result = await this.app.mysql.query(sql);
        // console.log(6666,result);
        if (!result) {
            res = { code: -1, msg: '获取失败' };
        }
        res.aldesc = result;
        ctx.body = res;
    }
    // 获取草稿列表
    async issuefalse() {
        const { ctx } = this;
        let data = ctx.request.query;
        // console.log(data,"issuefalse");
        const sql = `SELECT * FROM articles WHERE articles.uid=${data.uid} and status = 0`;
        const results = await this.app.mysql.query(sql);
        //学会打印观察数据
        // console.log(results,'获取草稿');
         if(!results){
            results = {code:-1, msg:'对应的文章不存在'};
        }
        ctx.body = results;
    }
    // 获取单篇草稿
    async draftarticle() {
        const { ctx } = this;
        let data = ctx.request.query;
        console.log(data,"draftarticle");
        const sql = `SELECT * FROM articles WHERE aid=${data.aid}`;
        const results = await this.app.mysql.query(sql);
        //学会打印观察数据
        console.log(results,'获取草稿');
         if(!results){
            results = {code:-1, msg:'对应的文章不存在'};
        }
        ctx.body = results;
    }
}

module.exports = articleController;