module.exports = () => {
    return async function editAuthor(ctx, next) {
        if(ctx.session.eid && ctx.session.tel){
            //next是表示下一步的意思 ，进入路由对应的控制
            await next();
        }else{
            // ctx.status = 401;
            ctx.body = {code:401, msg:'请登录授权'};
            //就不要进入控制器
            return;
        }
    };
};