---
title: AngularJS跨页面传值（ui-router）
date: 2017-08-23 18:15:28
tags: angularjs
categories: 前端
---
> 摘要： Angularjs中通过url传递参数。

今天碰到一个需求，同事开发的业务中需要跳到我的业务中，并传递参数过来，这就需要将参数通过url路由传递过来。在angularjs中该怎样做呢？

我们知道通常路由控制都是通过引用ui-router库，调用$stateProvider和$urlRouterProvider服务来控制的，想要在路由中传递参数还是要找它们来解决。下面来分别说一下它们各自是怎么工作的。

## $urlRouterProvider

$urlRouterProvider一般处理在状态配置中指定的url路由方式之外的 url 请求的路由方式。

```javascript
$urlRouterProvider.otherwise('/index');
```

这个东西能不能在路由过程中传递参数还没有实践过，等研究清楚了再来细说。

## $stateProvider

```javascript
$stateProvider.state('search', {
    url: '/search',
    views: {
        'header': {
            templateUrl: "../common/header/head_nav.html",
            controller: 'headerCtrl'
        },
        'appState': {
            templateUrl: '../search/search.html',
            controller: "searchCtrl"
        }
    }
});
```

这里我们定义了一个路由search，里面包含了ui-view需要加载的视图和controller。现在我们给这个路由添加参数：

```javascript
$stateProvider.state('search', {
    url: '/search/{id}',
    views: {
        'header': {
            templateUrl: "../common/header/head_nav.html",
            controller: 'headerCtrl'
        },
        'appState': {
            templateUrl: '../search/search.html',
            controller: "searchCtrl"
        }
    }
})
```

只需要花括号里面定义参数名就完成了，就是这么简单。而且不用花括号，使用冒号也是可以的：

```javascript
$stateProvider.state('search', {
    url: '/search/:id',
    views: {
        'header': {
            templateUrl: "../common/header/head_nav.html",
            controller: 'headerCtrl'
        },
        'appState': {
            templateUrl: '../search/search.html',
            controller: "searchCtrl"
        }
    }
});

```

两种方式有什么区别呢？简单说就是花括号的形式功能更加强大，花括号里面是可以添加正则表达式的：

```javascript
$stateProvider.state('search', {
    url: '/search/{id:[0-9]{1,8}}',
    views: {
        'header': {
            templateUrl: "../common/header/head_nav.html",
            controller: 'headerCtrl'
        },
        'appState': {
            templateUrl: '../search/search.html',
            controller: "searchCtrl"
        }
    }
});
```
甚至你还可以使用传统的http的get方式添加参数：
```javascript
url: '/search?id&name'
//匹配 url: '/search?id=value1&name=value2'
```
很灵活很强大吧～接下来就是在到达页面获取到这些参数，这需要用到$stateParams服务

```javascript
controller: function($stateParams){
  $stateParams.id
  $stateParams.name  
}

```
如果url中没有该参数，我们会得到undefined。
如果url中没有该参数，我们会得到undefined。

> *原文链接：https://yq.aliyun.com/articles/59333*
