---
title: Django CMS教程
date: 2017-12-20 11:53:38
tags:
categories: 后端
---

### 前言：
最近我在公司里负责官网后台升级工作，因为之前网站是单纯的静态页面，在升级时需要满足每个页面的内容都可以在后台替换，为此我寻找了很多关于django的CMS工具，像FeinCMS、Mezzanine和Django-cms，综合比较后，我发现Django-cms更符合我的需求。 首先它集成的placeholder完美的解决了页面内容替换的需求，即所见即所得(WYSIWYG)，还有像Page管理、可扩展的菜单系统、基于plugin的扩展机制等功能，其次它的用户使用量较高，文档说明详细，界面美观、显著改善了Django原因的后台界面美观。 但是Django-cms并不是一个开箱即用的产品，在网上根本找不到模板或者主题，官方文档也是英文所写，对于新手快速上手有一定困难度，本教程是总结开发时候的经验，提供一个平滑的学习教程，以后也会不断更新。

### 安装 django CMS
我们将从安装虚拟环境开始
#### 版本要求
django CMS 需要使用Django 1.8, 1.9, 1.10 和 Python 2.7， 3.3 或者3.4

#### 创建和激活虚拟环境
我们假设你已经安装`virtualenv`,并且你了解最基本的使用。
```shell
virtualenv env
source env/bin/activate
```
如果你使用Windows系统，你需要这样激活环境
```shell
env\Scripts\activate
```
#### 更新pip
`pip` 是Python的安装器，保证你安装的是最新的。
```shell
pip install --upgrade pip
```
#### 使用django CMS安装器
安装：
```shell
pip install djangocms-installer
```
它提供一个新的命令，`djangocms`

创建一个新的工作目录，然后进入这个目录
```shell
mkdir tutorial-project
cd tutorial-project
```
创建一个Django项目，命名为`mysite`
```shell
djangocms -f -p . mysite
```
上面命令意味着：

- 运行django CMS安装器
- `-f` 安装Django Filer **本教程需要**
- `-p` 使用当前目录作为新项目目录的父目录
- `mysite` 新项目的名称

> 注意：如果当前目录不是空目录，需要添加`-s`,但是可能会覆盖已有文件

安装后setting.py 会配置一些默认参数，建议你根据实际情况来修改参数。

安装器默认会创建一个管理账户，用户名`admin`，密码`admin`
#### 启动开发服务器
```shell
python manage.py runserver
```
在浏览器打开`http://localhost:8000/`，你将会看到的Django CMS登录页面
![这里写图片描述](http://img.blog.csdn.net/20171220114031412?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRGFHZWdlcg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

恭喜你！已经成功安装一个功能完整的django CMS！
