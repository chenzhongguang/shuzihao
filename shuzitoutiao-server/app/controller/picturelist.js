'use strict';
// const svgCaptcha = require('svg-captcha');

const Controller = require('egg').Controller;
const fs = require("fs");
const path = require("path");
class PicturelistController extends Controller {

    async pict() {
        const { ctx } = this;
        const v = ctx.request.query;
        const a = ctx.session.uid;

        const results = await this.app.mysql.select('picture', { // 搜索 post 表
            where: { uid: a }, // WHERE 条件
            columns: ['pid', 'uid', 'content'], // 要查询的表字段
        });
        ctx.body = results;
    }
    //删除图片
    async del() {
        const { ctx } = this;
        let r = { code: 1, msg: '删除成功' }
        let res = { code: 1, msg: '数据获取成功' };
        const v = ctx.request.query;
        const a = ctx.session.uid;
        console.log(11, v);
        console.log(22, a);
        const result = await this.app.mysql.delete('picture', {
            pid: v.pid,
        });
        if (result.affectedRows === 0) {
            r = { code: -1, msg: '删除失败' }
        }
        //   console.log(result.affectedRows);
        result.r = r;
        ctx.body = result;
    }

    // 图片显示
    async uploads() {
        const { ctx, app } = this;
        const file = ctx.request.files[0];
        const uid = ctx.session.uid;
        const data = {
            "errno": 0,
            "data": {}
        }
        console.log(file, '9999');
        fs.copyFileSync(file.filepath, path.dirname(__dirname) + '/public/uploads/' + path.basename(file.filepath))
        data.data.url = "http://127.0.0.1:81/public/uploads/" + path.basename(file.filepath);
        const options = {
            where: {
                uid: ctx.session.uid
            }
        };
        data.data.alt = file.filename;
        const row = {
            uid: ctx.session.uid,
            content: data.data.url,
        };
        const result = await this.app.mysql.insert('picture', row, options); // 在 post 表中，插入 title 为 Hello World 的记录
        ctx.body = data;
    }

}

module.exports = PicturelistController;
