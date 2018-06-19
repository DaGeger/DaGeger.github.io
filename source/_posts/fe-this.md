---
title: this经典题目
date: 2017-11-10 10:37:13
tags:
categories: 前端
cover: cover.png
author:
    nick: DaGege
    link: 
subtitle: this的指向问题应该是让每一个前端er都头疼的问题，我也一样，曾经遇到甚至都是一顿乱猜。
---
经典题目，在javascript中，`this`是如何工作的

```javascript
var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test());
```

# 答案

这段代码打印结果是：`Aurelio De Rosa` 和 `John Doe` 。原因是，`JavaScript`中关键字`this`所引用的是函数上下文，取决于函数是如何调用的，而不是怎么被定义的。

在第一个`console.log()`，`getFullname()`是作为`obj.prop`对象的函数被调用。因此，当前的上下文指代后者，并且函数返回这个对象的`fullname`属性。相反，当`getFullname()`被赋值给`test`变量时，当前的上下文是全局对象`window`，这是因为`test`被隐式地作为全局对象的属性。基于这一点，函数返回`window`的`fullname`，在本例中即为第一行代码设置的
