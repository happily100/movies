const http = require('http');
const fs = require("fs");
const querystring = require("querystring")
const express = require('express');
const app = express()
const ejs = require("ejs")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie', { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
var logSchema = new Schema({
    name: String,
    password: Number,
    usertype: String,
});
const logObj = mongoose.model('users', logSchema);

var allSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    aname: String,
    atime: String,
    adirector: String,
    aactor: String,
    astory: String,
    apicture: String,
});
const allObj = mongoose.model('alls', allSchema)

var hotSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'alls' },
    hname: String,
    htime: String,
    hdirector: String,
    hactor: String,
    htype: String,
});
const hotObj = mongoose.model('hots', hotSchema)

var soonSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'alls' },
    jname: String,
    jtime: String,
    jdirector: String,
    jactor: String,
    jtype: String,
});
const soonObj = mongoose.model('soons', soonSchema)

app.set("view enging", "ejs")
app.set("views", "./views")

app.use(express.static(__dirname + "/public"))
var name = '';
var password = '';
var submit = '';
var usertype = '';

var _id = '';
var aname = '';
var atime = '';
var adirector = '';
var aactor = '';
var astory = '';
var apicture = '';

var hname = '';
var htime = '';
var hdirector = '';
var hactor = '';
var htype = '';

var jname = '';
var jtime = '';
var jdirector = '';
var jactor = '';
var jtype = '';

//doc={};


app.get('/input', (req, res, next) => {
    name = req.query.name;
    password = req.query.password;
    submit = req.query.submit1;
    usertype = req.query.usertype;
    next();
})
//user
app.get('/input', (req, res, next) => {
    loginData = new logObj({ name: name, password: password, usertype: usertype });
    logObj.find({ name: name, usertype: usertype }, (err, docs) => {
        if (!err) {
            if (docs.length != 0) nameInDB = 100;
            else nameInDB = 0;
            next();
        }
    });
})
//admin
app.get('/add', (req, res, next) => {
    _id = req.query._id;
    aname = req.query.aname;
    atime = req.query.atime;
    adirector = req.query.adirector;
    aactor = req.query.aactor;
    astory = req.query.astory;
    apicture = req.query.apicture;
    submit = req.query.submit;
    allData = new allObj({ aname: aname, atime: atime, adirector: adirector, aactor: aactor, astory: astory, apicture: apicture });
    allObj.find({ _id: _id, aname: aname, atime: atime, adirector: adirector, aactor: aactor, astory: astory, apicture: apicture }, (err, docs) => {
        if (!err) {
            if (docs.length != 0) nameInDB = 100;
            else nameInDB = 0;
            next();
        }
    });
})
app.get('/adminall', (req, res, next) => {
    aname = req.query.aname;
    submit = req.query.submit;
    next();
})
app.get('/admininfo', (req, res, next) => {
    _id = req.query._id;
    aname = req.query.aname;
    atime = req.query.atime;
    adirector = req.query.adirector;
    aactor = req.query.aactor;
    astory = req.query.astory;
    apicture = req.query.apicture;
    atype = req.query.atype;
    submit = req.query.submit;
    next();
})
app.get('/userhome', (req, res, next) => {
    submit = req.query.submit;
    aname = req.query.aname;
    next();
})
app.get('/userinfo', (req, res, next) => {
    aname = req.query.aname;
    atime = req.query.atime;
    adirector = req.query.adirector;
    aactor = req.query.aactor;
    astory = req.query.astory;
    apicture = req.query.apicture;
    atype = req.query.atype;

    submit = req.query.submit;
    next();
})

// input
app.get('/input', (req, res, next) => {
    if (submit == "注册") {
        if (name.length == 0 || password.length == 0)
            res.render(__dirname + "/views/user.ejs", { message: '用户名和密码都不能为空，请输入。' })
        else if (nameInDB == 0) {
            loginData.save((err) => console.log('注册成功'));
            if (usertype == "用户") {
                res.render(__dirname + "/views/userhome.ejs", { message: usertype + ', 欢迎' + name })
            }
            else
                res.render(__dirname + "/views/adminall.ejs", { message: usertype + ', 欢迎' + name })
        }
        else {
            res.render(__dirname + "/views/user.ejs", { message: '用户名密码已存在，请重新注册' })
        }
    }
    else next()
})
app.get('/input', (req, res, next) => {
    if (submit == "登录") {
        logObj.find({ name: name, password: password, usertype: usertype }, (err, docs) => {
            if (docs.length == 0) {
                res.render(__dirname + "/views/user.ejs", { message: '用户名、密码或用户类型错误，请重新登录' })
            }
            else {
                if (usertype == "用户") {
                    res.render(__dirname + "/views/userhome.ejs", { message: usertype + ', 欢迎' + name })
                }
                else {
                    res.render(__dirname + "/views/adminall.ejs", { message: usertype + ', 欢迎' + name })
                }
            }
        });
    }
    else next();
})

// adminall
app.get('/adminall', (req, res, next) => {
    if (submit == "增加")
        res.render(__dirname + "/views/add.ejs", { message: '' })
    else next();
})
app.get('/adminall', (req, res, next) => {
    if (submit == "登录")
        res.render(__dirname + "/views/user.ejs", { message: '' })
    else next();
})
//查询
app.get('/adminall', (req, res, next) => {
    if (submit == "查询") {
        var reg = new RegExp(aname);
        var _filter = {
            //多字段匹配
            $or: [
                { 'aname': { $regex: reg } },
                { 'aactor': { $regex: reg } },
                { 'atype': { $regex: reg } },
                { 'atime': { $regex: reg } },
                { 'adirector': { $regex: reg } },
            ]
        }
        allObj.find(_filter, (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(docs)
                res.render(__dirname + "/views/adminall.ejs", { message: docs })
            }
        })
    }
    else next();
})
//全部信息
app.get('/adminall', (req, res, next) => {
    if (submit == "全部") {
        allObj.find({}, function (err, doc) {
            if (err) console.log(err.message)
            else {
                res.render(__dirname + "/views/adminall.ejs", { message: doc })
            }
        })
    }
    else next();
})


// add
app.get('/add', (req, res, next) => {
    if (submit == "电影首页")
        res.render(__dirname + "/views/adminall.ejs", { message: '' })
    else next();
})
//增加
app.get('/add', (req, res, next) => {
    if (submit == "增加") {
        if (aname.length == 0)
            res.render(__dirname + "/views/add.ejs", { message: '电影名称不能为空，请输入。' })
        else if (nameInDB == 0) {
            allData.save((err) => console.log('增加成功'));
            res.render(__dirname + "/views/add.ejs", { message: '增加成功' })
        }
        else {
            res.render(__dirname + "/views/add.ejs", { message: '该电影已存在，请重新输入' })
        }
    }
    else next()
})

//电影信息
app.get('/admininfo', (req, res, next) => {
    if (submit == "电影首页")
        res.render(__dirname + "/views/adminall.ejs", { message: '' })
    else next();
})
//修改
app.get('/admininfo', (req, res, next) => {
    if (submit == "修改") {
        allObj.updateMany({ _id: _id }, { $set: { aname: aname, atime: atime, adirector: adirector, aactor: aactor, astory: astory, apicture: apicture } }, function (err, doc) {
            if (err) console.log(err.message)
            else {
                console.log("修改成功")
                res.render(__dirname + "/views/admininfo.ejs", { message: doc })
            }
        })
    }
    else next();
})
//删除
app.get('/admininfo', (req, res, next) => {
    if (submit == "删除") {
        allObj.remove({ "aname": aname }, function (err, doc) {
            if (err) console.log(err.message)
            else {
                console.log("删除成功")
                res.render(__dirname + "/views/admininfo.ejs", { message: doc })
            }
        })
    }
    else next();
})
//详情
app.get('/admindetail', (req, res) => {
    aname = req.query.aname;
    allObj.find({ aname: aname }, (err, doc) => {
        if (!err)
            res.render(__dirname + "/views/admininfo.ejs", { message: doc })
    })
});

//userhome
app.get('/userhome', (req, res, next) => {
    if (submit == "登录")
        res.render(__dirname + "/views/user.ejs", { message: '' })
    else next();
})
//全部信息
app.get('/userhome', (req, res, next) => {
    if (submit == "全部电影") {
        allObj.find({}, function (err, doc) {
            if (err) console.log(err.message)
            else {
                res.render(__dirname + "/views/userhome.ejs", { message: doc })
            }
        })
    }
    else next();
})
app.get('/userhome', (req, res, next) => {
    if (submit == "热播电影") {
        hotObj.aggregate([{//聚合查询https://www.jianshu.com/p/b330a5ba9652
            $lookup: { //关联
                from: "alls",//关联的表名
                localField: "_id", //本身的外键
                foreignField: "_id",//需要关联表的外键
                as: "info" //起个名字，随便，和下面对应
            }
        }, {
            $unwind: { // 拆分子数组
                path: "$info", //和上面对应
                preserveNullAndEmptyArrays: true //固定的
            }
        },
        {
            $group: { //组包
                _id: "$_id",
                hname: {
                    $first: "$hname"
                },
                hactor: {
                    $first: "$hactor"
                },
                hdirector: {
                    $first: "$hdirector"
                },
                htime: {
                    $first: "$htime"
                },
                htype: {
                    $first: "$htype"
                },
                info: { //detail是上面起的别名
                    $first: "$info" //和上面对应
                }
            }
        }], (err, data) => {
            console.log(data)
            res.render(__dirname + "/views/userhot.ejs", { message: data })
        })
    }
    else next();
})
app.get('/userhome', (req, res, next) => {
    if (submit == "即将上映") {
        soonObj.aggregate([{//聚合查询https://www.jianshu.com/p/b330a5ba9652
            $lookup: { //关联
                from: "alls",//关联的表名
                localField: "_id", //本身的外键
                foreignField: "_id",//需要关联表的外键
                as: "info" //起个名字，随便，和下面对应
            }
        }, {
            $unwind: { // 拆分子数组
                path: "$info", //和上面对应
                preserveNullAndEmptyArrays: true //固定的
            }
        },
        {
            $group: { //组包
                _id: "$_id",
                jname: {
                    $first: "$jname"
                },
                jactor: {
                    $first: "$jactor"
                },
                jdirector: {
                    $first: "$jdirector"
                },
                jtime: {
                    $first: "$jtime"
                },
                jtype: {
                    $first: "$jtype"
                },
                info: { //detail是上面起的别名
                    $first: "$info" //和上面对应
                }
            }
        }], (err, data) => {
            console.log(data)
            res.render(__dirname + "/views/usersoon.ejs", { message: data })
        })
    }
    else next();
})
//详情
app.get('/userdetail', (req, res) => {
    aname = req.query.aname;
    allObj.find({aname:aname}, function (err, doc) {
        if (err) console.log(err.message)
        else {
            res.render(__dirname + "/views/userinfo.ejs", { message: doc })
        }
    })
});

//查询
app.get('/userhome', (req, res, next) => {
    if (submit == "查询") {
        var reg = new RegExp(aname);
        var _filter = {
            //多字段匹配
            $or: [
                { 'aname': { $regex: reg } },
                { 'aactor': { $regex: reg } },
                { 'atype': { $regex: reg } },
                { 'atime': { $regex: reg } },
                { 'adirector': { $regex: reg } },
            ]
        }
        allObj.find(_filter, (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(docs)
                res.render(__dirname + "/views/userhome.ejs", { message: docs })
            }
        })
    }
    else next();
})

//userinfo
app.get('/userinfo', (req, res, next) => {
    if (submit == "电影首页")
        res.render(__dirname + "/views/userhome.ejs", { message: '' })
    else next();
})

//userhot
app.get('/userhot', (req, res, next) => {
    submit = req.query.submit;
    if (submit == "电影首页")
        res.render(__dirname + "/views/userhome.ejs", { message: '' })
    else next();
})


//usersoon
app.get('/usersoon', (req, res, next) => {
    submit = req.query.submit;
    if (submit == "电影首页")
        res.render(__dirname + "/views/userhome.ejs", { message: '' })
    else next();
})

app.listen(3000)
