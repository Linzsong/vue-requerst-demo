module.exports = {
    configureWebpack: {
        before(app) {
            //模拟后台服务区 express写法
            app.get("api/login", function(req, res) {
                const { username, password } = req.query;
                console.log(username, password);

                if(username == 'admin' && password == "123") {
                    res.json({ code: 1, token: "token"})
                } else {
                    res.status(401).json({ code: 0, message: '用户名或密码错误' });
                }
            })

        }
    }
}
