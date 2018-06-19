---
title: 快速理解JS中apply()和call()原理
date: 2017-12-20 16:35:59
tags: JavaScript
categories: 前端
cover: cover.jpg
author:
    nick: DaGege
    link: 
subtitle: 最近又遇到了JacvaScript中的call()方法和apply()方法，而在某些时候这两个方法还确实是十分重要的
---
在了解`call()`和`apply()`原理之前，我们必须对`this`的作用和使用方法有所了解，如果你属性`this` 的用法，那么请直接往下看。

### call方法:

语法：`call([thisObj[,arg1[, arg2[,   [,.argN]]]]])`

定义：调用一个对象的一个方法，以另一个对象替换当前对象。
说明：call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。 如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj。

### apply方法：

语法：`apply([thisObj[,argArray]])`

定义：应用某一对象的一个方法，用另一个对象替换当前对象。
说明：如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。
如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj， 并且无法被传递任何参数。

`call()`和`apply()`的作用十分相似，只是参数类型上的差别，以适应不同的使用场景。它们都是为了改变函数运行时的 context（上下文）而存在的，再说的直白一点，就是为了改变函数内部 this 的指向。

### 举例说明

我们有一句很经典的谚语，说的是：龙生龙，凤生凤，老鼠生来会打洞，这从遗传上解释是，动物的某些行为有可能是由一系列基因所调控的，但是，注意，我们偏偏想让龙来打洞呢，该如何去实现？下面将围绕这个话题来解释`call()`和`apply()`的原理。

```JavaScript
var dragon = {
  name : 'foo'
  // other attribute
}

var mouse = {
  name : 'tom',
  makeHole : function(where){
    console.log(this.name + ' is making a hole in the ' + where)
  }
  // other attribute
}

mouse.makeHole.call(dragon,'hill')

```

运行上面代码后会在控制台上打印出：

![](http://img.blog.csdn.net/20171220150934229?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRGFHZWdlcg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
可以看出，我们声明了一个`dragon`的对象，我们并没有赋予它`打洞`的功能，但是我们使用`call()`继承了`mouse`的方法，就可以做到`mouse`函数所能做到的事情。

这到底是怎么做到的呢？让我们来看看`call()`的参数：
第一个是一个对象，这个对象将代替`Function`类里原本的`this`对象，我们传入的是`this`，记住，这个`this`在`makeHole`函数里指的是未来将要实例化这个函数的对象（我知道这有些拗口），当声明了`dragon`的时候，这个`this`指的就是`dragon`。除了第一个参数，后面所有的参数都是传给父函数本身使用的参数。

而`apply()`和`call()`功能几乎一样，唯一的区别就是`apply()`第二个参数只能是数组，这个数组将作为参数传给原函数的参数列表`arguments`。

### 模拟实现call()函数

`call()`函数是什么样的原理呢？我们用一个实例来帮助理解。

```javascript
//创建Dragon
function Dragon(name) {
  this.name = name;
}

//创建一个说话的函数
function say(content) {
  console.log(this.name + ' : ' + content)
}

//模拟原生call函数
Function.prototype.myCall = function(context) {
  context = context || window;

  var args = [];
  context.fn = this;

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  };

  context.fn(...args);
  delete context.fn;
};

//实例化一个名字为'foo'的龙
var foo = new Dragon('foo')

//让foo说话
say.myCall(foo, 'I can talk!')
```

上面的代码很容易理解，唯一的困难点在于理解在原型链上的`myCall`函数
我们来分析实现的步骤：

1. 做一个多场景适配，当`myCall`函数没有接收到参数时，`context`对应的是`window`对象
2. 创建一个空数组，用于接收形参。
3. 绑定`this`，这里的`this`代表的就是上下文中的`say`函数。
4. `for`循环将参数添加到`args`数组，循环从1开始是因为第0位是`foo`对象，并非我们需要的参数
5. 执行函数，并将`args`数组作为rest参数传入，这里是ES6的写法，不熟悉的同学参见阮一峰老师的[rest 参数](http://es6.ruanyifeng.com/#docs/function#rest-%E5%8F%82%E6%95%B0)文档
6. 删除函数

打印结果为：
![](http://img.blog.csdn.net/20171220161501558?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvRGFHZWdlcg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

可以看到，这里我们实现了让一个叫做`foo`的龙说话！
___`apply()`函数实现方式同样类似，可以修改上述例子实现，主要是在参数一部分做处理。___
