var express = require('express');
var app = express();
var engine = require('ejs-locals');
app.engine('ejs',engine);
app.set('views','./views');
app.set('view engine','ejs');
//增加靜態檔案的路徑
app.use(express.static('public'))

//路由
app.get('/',function(req,res){
    res.render('index',{
        'title':'六角學院',
        'boss':'liao'
    });
})
app.get('/user',function(req,res){
    res.render('user');
})

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);
