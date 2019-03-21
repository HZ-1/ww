const HomeService = require('../service/home');
module.exports = {
    index: async (ctx, next) => {
        await ctx.render("home/index", {title: "iKcamp欢迎您"});
    },
    home: async (ctx, next) => {
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.response.body = '<h1>HOME page</h1>';
    },
    homeParams: async (ctx, next) => {
        console.log(ctx.params);
        ctx.response.body = '<h1>HOME page /:id/:name</h1>';
    },
    login: async (ctx, next) => {
        //ctx.render并非ctx自带的原生方法，而是
        // koa-nunjucks-2绑定到上下文上的，
        // home/login 其实是views/home/login.html路径
        await ctx.render('home/login',{
            btnName: 'GoGoGo'
        });
    },
    register: async (ctx, next) => {
        let params = ctx.request.body;
        let name = params.name;
        let password = params.password;
        let res = await HomeService.register(name,password);
        if(res.status == "-1"){
          await ctx.render("home/login", res.data);
        }else{
          ctx.state.title = "个人中心";
          await ctx.render("home/success", res.data);
        }
    }
}