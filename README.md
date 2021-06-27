# 1.系统概述
## 1.1	系统简介
近年来随着电影行业的快速发展，需要管理的电影信息日趋加大。为了提高电影信息管理水平，优化资源，尽可能的降低管理成本。本系统主要为电影信息管理系统，该系统能够实现对电影信息的管理等各项操作，帮助电影管理人员有效管理电影信息。
## 1.2	系统工具
项目类型为B/S类型的信息管理系统。系统编程语言为nodejs，数据库使用mongodb；后端框架express。

# 2.	系统内容简介
## 2.1	系统功能设计
	该系统主要分为管理员和普通用户两个方面管理，两者都需通过注册和登录进入相关的界面。普通用户仅可查看、查询相关的电影信息；
	管理员可以在查询、查看电影信息之外，增加、删除、修改电影信息。
## 2.2	页面说明
页面名称 	功能
index.html	登录注册界面
user.ejs	登录注册界面
userhome.ejs	用户主页
userhot.ejs	热播电影界面
usersoon.ejs	即将上映电影界面
userinfo.ejs	电影详情界面
adminall.ejs	管理员首页（电影全部信息）
admininfo.ejs	电影详情界面（可进行修改、删除）
add.ejs	增加电影界面
## 2.3	电影信息数据库设计
### 2.3.1	全部电影信息
 
全部电影信息包括：电影名称:aname，导演:adirector，演员:aactor，电影简介:astory，电影图片:apicture，上映时间:atime
### 2.3.2	热播电影信息
 
全部电影信息包括：电影名称:hname，导演:hdirector，演员:hactor，电影类型:htype，上映时间:htime
其中_id为外键，连接alls里的_id获取其中的电影简介和图片等信息
### 2.3.3	即将上映电影信息
 
全部电影信息包括：电影名称:jname，导演:jdirector，演员:jactor，电影类型:jtype，上映时间:jtime
其中_id为外键，连接alls里的_id获取其中的电影简介和图片等信息
### 2.3.4	用户信息
 
用户信息包括：用户名:name，密码:password，用户类型:usertype
## 2.4	用户信息管理功能设计
### 2.4.1	登陆注册界面
普通用户可以通过注册操作注册相关信息，然后在注册成功后进行登录。
 
当用户名和密码存在或未填写相关信息时，会出现填写提示。
 
### 2.4.2	首页显示电影信息
登陆成功后进入首页，点击全部电影按钮，即可显示全部电影信息
 
运用两表联合查询，连接hots和alls两表，以及soons和alls两表，查询相关电影的详细信息。
在电影首页，点击热播电影按钮，即可显示全部热播电影信息；点击电影首页即可返回首页
 
在电影首页，点击即将上映按钮，即可显示全部即将上映电影信息；点击电影首页即可返回首页
 
### 2.4.3	查询电影信息
可以根据电影名称，电影类型，上映时间，导演，演员相关信息查询想要查看的电影信息。在首页，在输入框中输入想要查询的信息后，点击查询按钮，即可显示相关信息
 
### 2.4.4	查看电影详细信息
点击详情按钮即可查看该电影详细的电影信息。
 
## 2.5	管理员信息管理功能设计
### 2.5.1	管理员登录注册
管理员可以注册登录系统，并在下拉框选择管理员选项
 
### 2.5.2	全部电影信息
在登录或注册成功后，进入管理员首页。点击全部按钮，显示全部电影信息。
 
### 2.5.3	查询电影信息
可以根据电影名称，电影类型，上映时间，导演，演员相关信息查询想要查看的电影信息。在首页，在输入框中输入想要查询的信息后，点击查询按钮，即可显示相关信息
 
### 2.5.4	增加电影信息
在管理员首页，点击增加按钮，进入增加页面，填入相关信息，即可增加电影信息
 
### 2.5.5	查看电影详细信息
找到想要查看的电影，点击详情按钮即可查看详细的电影信息
 
### 2.5.6	修改电影信息
查看电影详细信息后，在详情页面，修改该电影的信息，点击修改按钮，即可修改成功
 
再次查询时，可查询到修改的电影信息
 
### 2.5.7	删除电影信息
查看电影详细信息后，在详情页面，点击删除按钮，即可删除成功
再次查询时，查询不到该电影信息
 

# 3.	Github上的代码链接
https://github.com/happily100/movies.git



