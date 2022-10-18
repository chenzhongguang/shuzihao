module.exports = options => {
    return async function jwt(ctx, next) {
        /** 接收请求头里面的数据 */
        const token = ctx.request.header.authorization;
        console.log(token);
        let decode;
        if (token) {
            try {
                // 解码token
                decode = ctx.app.jwt.verify(token, options.secret);
                console.log(decode);
                //把解码出来的信息追加到全局上下文ctx身上
                ctx.userInfo = decode;
                await next();
            } catch (error) {
                console.log(error);
                //ctx.status = 401;
                ctx.body = {
                    code:401,
                    msg: '请重新登录授权'
                };
                return;
            }
        } else {
            //ctx.status = 401;
            ctx.body = {
                code:401,
                msg: '请登录授权'
            };
            return;
        }
    };
};