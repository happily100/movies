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
    if (submit == "??????") {
        if (name.length == 0 || password.length == 0)
            res.render(__dirname + "/views/user.ejs", { message: '????????????????????????????????????????????????' })
        else if (nameInDB == 0) {
            loginData.save((err) => console.log('????????????'));
            if (usertype == "??????") {
                res.render(__dirname + "/views/userhome.ejs", { message: usertype + ', ??????' + name })
            }
            else
                res.render(__dirname + "/views/adminall.ejs", { message: usertype + ', ??????' + name })
        }
        else {
            res.render(__dirname + "/views/user.ejs", { message: '??????????????????????????????????????????' })
        }
    }
    else next()
})
app.get('/input', (req, res, next) => {
    if (submit == "??????") {
        logObj.find({ name: name, password: password, usertype: usertype }, (err, docs) => {
            if (docs.length == 0) {
                res.render(__dirname + "/views/user.ejs", { message: '?????????????????????????????????????????????????????????' })
            }
            else {
                if (usertype == "??????") {
                    res.render(__dirname + "/views/userhome.ejs", { message: usertype + ', ??????' + name })
                }
                else {
                    res.render(__dirname + "/views/adminall.ejs", { message: usertype + ', ??????' + name })
                }
            }
        });
    }
    else next();
})

// adminall
app.get('/adminall', (req, res, next) => {
    if (submit == "??????")
        res.render(__dirname + "/views/add.ejs", { message: '' })
    else next();
})
app.get('/adminall', (req, res, next) => {
    if (submit == "??????")
        res.render(__dirname + "/views/user.ejs", { message: '' })
    else next();
})
//??????
app.get('/adminall', (req, res, next) => {
    if (submit == "??????") {
        var reg = new RegExp(aname);
        var _filter = {
            //???????????????
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
//????????????
app.get('/adminall', (req, res, next) => {
    if (submit == "??????") {
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
    if (submit == "????????????")
        res.render(__dirname + "/views/adminall.ejs", { message: '' })
    else next();
})
//??????
app.get('/add', (req, res, next) => {
    if (submit == "??????") {
        if (aname.length == 0)
            res.render(__dirname + "/views/add.ejs", { message: '???????????????????????????????????????' })
        else if (nameInDB == 0) {
            allData.save((err) => console.log('????????????'));
            res.render(__dirname + "/views/add.ejs", { message: '????????????' })
        }
        else {
            res.render(__dirname + "/views/add.ejs", { message: '????????????????????????????????????' })
        }
    }
    else next()
})

//????????????
app.get('/admininfo', (req, res, next) => {
    if (submit == "????????????")
        res.render(__dirname + "/views/adminall.ejs", { message: '' })
    else next();
})
//??????
app.get('/admininfo', (req, res, next) => {
    if (submit == "??????") {
        allObj.updateMany({ _id: _id }, { $set: { aname: aname, atime: atime, adirector: adirector, aactor: aactor, astory: astory, apicture: apicture } }, function (err, doc) {
            if (err) console.log(err.message)
            else {
                console.log("????????????")
                res.render(__dirname + "/views/admininfo.ejs", { message: doc })
            }
        })
    }
    else next();
})
//??????
app.get('/admininfo', (req, res, next) => {
    if (submit == "??????") {
        allObj.remove({ "aname": aname }, function (err, doc) {
            if (err) console.log(err.message)
            else {
                console.log("????????????")
                res.render(__dirname + "/views/admininfo.ejs", { message: doc })
            }
        })
    }
    else next();
})
//??????
app.get('/admindetail', (req, res) => {
    aname = req.query.aname;
    allObj.find({ aname: aname }, (err, doc) => {
        if (!err)
            res.render(__dirname + "/views/admininfo.ejs", { message: doc })
    })
});

//userhome
app.get('/userhome', (req, res, next) => {
    if (submit == "??????")
        res.render(__dirname + "/views/user.ejs", { message: '' })
    else next();
})
//????????????
app.get('/userhome', (req, res, next) => {
    if (submit == "????????????") {
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
    if (submit == "????????????") {
        hotObj.aggregate([{//????????????https://www.jianshu.com/p/b330a5ba9652
            $lookup: { //??????
                from: "alls",//???????????????
                localField: "_id", //???????????????
                foreignField: "_id",//????????????????????????
                as: "info" //???????????????????????????????????????
            }
        }, {
            $unwind: { // ???????????????
                path: "$info", //???????????????
                preserveNullAndEmptyArrays: true //?????????
            }
        },
        {
            $group: { //??????
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
                info: { //detail?????????????????????
                    $first: "$info" //???????????????
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
    if (submit == "????????????") {
        soonObj.aggregate([{//????????????https://www.jianshu.com/p/b330a5ba9652
            $lookup: { //??????
                from: "alls",//???????????????
                localField: "_id", //???????????????
                foreignField: "_id",//????????????????????????
                as: "info" //???????????????????????????????????????
            }
        }, {
            $unwind: { // ???????????????
                path: "$info", //???????????????
                preserveNullAndEmptyArrays: true //?????????
            }
        },
        {
            $group: { //??????
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
                info: { //detail?????????????????????
                    $first: "$info" //???????????????
                }
            }
        }], (err, data) => {
            console.log(data)
            res.render(__dirname + "/views/usersoon.ejs", { message: data })
        })
    }
    else next();
})
//??????
app.get('/userdetail', (req, res) => {
    aname = req.query.aname;
    allObj.find({aname:aname}, function (err, doc) {
        if (err) console.log(err.message)
        else {
            res.render(__dirname + "/views/userinfo.ejs", { message: doc })
        }
    })
});

//??????
app.get('/userhome', (req, res, next) => {
    if (submit == "??????") {
        var reg = new RegExp(aname);
        var _filter = {
            //???????????????
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
    if (submit == "????????????")
        res.render(__dirname + "/views/userhome.ejs", { message: '' })
    else next();
})

//userhot
app.get('/userhot', (req, res, next) => {
    submit = req.query.submit;
    if (submit == "????????????")
        res.render(__dirname + "/views/userhome.ejs", { message: '' })
    else next();
})


//usersoon
app.get('/usersoon', (req, res, next) => {
    submit = req.query.submit;
    if (submit == "????????????")
        res.render(__dirname + "/views/userhome.ejs", { message: '' })
    else next();
})

app.listen(3000)
