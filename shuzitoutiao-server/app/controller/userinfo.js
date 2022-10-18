'use strict';
// const svgCaptcha = require('svg-captcha');

const Controller = require('egg').Controller;
const fs = require("fs");
const path = require("path");
class UserinfoController extends Controller {
    //一进页面就判断
    async replaces() {
        const { ctx } = this;
        const v = ctx.request.query;
        const a = ctx.session.uid;
        console.log(a);
        console.log(v);
        const results = await this.app.mysql.select('users', { // 搜索 post 表
            where: { uid: a }, // WHERE 条件
            columns: ['username', 'introduce', 'email', 'avatar','gender','type'], // 要查询的表字段
        });
        ctx.body = results;
    }

    //修改性别
    async place() {
        const { ctx,app } = this;
        const value = ctx.request.query;
        const uid = ctx.session.uid;
        const options = {
            where: {
                uid: ctx.session.uid
            }
        };
        if(value.value == '男'){
            console.log(2222222);
            const row = {
                uid: ctx.session.uid,
                gender:1
            };
            const result = await app.mysql.update('users', row, options); // 更新 posts 表中的记录
        }else if(value.value == '女'){
            const row = {
                uid: ctx.session.uid,
                gender:2
            };
            const result = await app.mysql.update('users', row, options); // 更新 posts 表中的记录
        }else if(value.value == '个人'){
            const row = {
                uid: uid,
                type:1
            };
            const result = await app.mysql.update('users', row, options); // 更新 posts 表中的记录
        }else if(value.value == '企业'){
            const row = {
                uid: ctx.session.uid,
                type:2
            };
            const result = await app.mysql.update('users', row, options); // 更新 posts 表中的记录
        }
        
        ctx.body = value;
    }


    // 修改头像
    async upload() {
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
        const row = {
            uid: ctx.session.uid,
            avatar: data.data.url,
        };
        const result = await app.mysql.update('users', row, options); // 更新 posts 表中的记录
        // console.log(data.data.url,11111);
        ctx.body = data;
    }

    //修改用户名，用户简介，邮箱
    async replace() {
        const { ctx } = this;
        let res = { code: 1, msg: '操作成功' };
        const value = ctx.request.query;
        const edi = value.edi / 1;
        const uid = ctx.session.uid;
        console.log(uid);
        console.log(edi);
        console.log(value);
        if (edi == 0) {
            const row = {
                username: value.usersinfo
            };
            const options = {
                where: {
                    uid: uid
                }
            };
            const result = await this.app.mysql.update('users', row, options); // 更新 posts 表中的记录
        } else if (edi == 1) {
            const row = {
                introduce: value.usersinfo
            };
            const options = {
                where: {
                    uid: uid
                }
            };
            const result = await this.app.mysql.update('users', row, options); // 更新 posts 表中的记录
        } else if (edi == 2) {
            const row = {
                email: value.usersinfo
            };
            const options = {
                where: {
                    uid: uid
                }
            };
            const result = await this.app.mysql.update('users', row, options); // 更新 posts 表中的记录
            console.log(result);
        }
        ctx.body = value;
    }
}

module.exports = UserinfoController;
