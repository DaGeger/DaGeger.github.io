---
title: JavaScript执行顺序详解
date: 2017-08-21 18:10:20
tags: JavaScript
categories: 前端
---


>如果说，JavaScript引擎的工作机制比较深奥是因为它属于底层行为，那么JavaScript代码执行顺序就比较形象了，因为我们可以直观感觉到这种执行顺序，当然JavaScript代码的执行顺序是比较复杂的，所以在深入JavaScript语言之前也有必要对其进行剖析。

### 按照HTML文档流顺序执行JavaScript代码

首先，大家应该清楚，HTML文档在浏览器中的解析过程是这样的：浏览器是按着文档流从上到下逐步解析页面结构和信息的。JavaScript代码作为嵌入的脚本应该也算做HTML文档的组成部分，所以JavaScript代码在装载时的执行顺序也是根据脚本标签`<script>`的出现顺序来确定的。
##### 下面实例可以看到代码是从上到下逐步被解析的
```
<script>
    console.log("顶部脚本");
</script>
<html>
<meta charset="utf-8">
<head>
    <script>
        console.log("头部脚本");
    </script>
    <title></title>
</head>
<body>
<script>
    console.log("页面脚本");
</script>
</body>
</html>
<script>
    console.log("底部脚本");
</script>
```



##### 输出结果顺序为：
```
顶部脚本
头部脚本
页面脚本
底部脚本
```
### JavaScript中`预编译阶段`与`执行阶段`的顺序关系

 javascript相对于其它语言来说是一种弱类型的语言，在其它如java语言中，程序的执行需要有编译的阶段，而在javascript中也有类似的“预编译阶段”,javascript的预编译是以代码块为范围`<script></script>`，即每遇到一个代码块都会进行预编译,然后再去执行）

首先科普下javascript中的两种声明方式，var和function，前者声明的是变量，后者声明的是方法。在预编译中，JavaScript对这两种声明做出了两种处理方案
```
<script>
    var a = "1";　　　　   //声明变量a
    function b() {　　　　 //声明方法b
        alert();
    }
    var c = function () { //声明变量c
        alert();
    }
</script>
```
以上代码块中a、c为变量赋值，b为函数声明。当执行以上代码时，首先会进入预编译阶段，对与变量赋值a、c会在内存中开辟一块内存空间并指向变量名，且赋值为undefined；对于函数声明，则同样会进行开辟内存空间，但赋值的对象会将声明的函数赋值给函数名。

##### 预编译阶段：（PS：不管代码中声明变量和声明函数的顺序如何，在预编译阶段会先声明变量，再声明函数）
```
<script>
    var a = undefined;
    var c = undefined;
    var b = function () {
        alert();
    }
</script>
```
##### 执行阶段：
```
<script>
    a = "1";
    c = function () {
        alert();
    }
</script>
```
##### 整体执行步骤：
```
<script>
    var a = undefined;
    var c = undefined;

    var b = function () {
        alert();
    };
    a = "1";
    c = function () {
        alert();
    }
</script>
```
##### 题目：
```
<script>
    var a = "1";
    function b() {
        alert(a);
        var a = "2";
    }
    b();
</script>
```
>**javascript的预编译阶段**
> 1.先预定义变量，再预定义函数
> 2.变量的预编译只作声明，不作初始化，初始化在执行时
> 3.function语句定义的函数，不仅声明了函数名，而且函数体也进行了处理
> 4.匿名函数不会预编译


### 按块执行JavaScript代码
如果js代码是由多个`<script>`组成,他们的执行顺序是怎样?
看下面的例子
```
<script>
    var str = 'world';
</script>

<script>
    function Hello() {
        alert("Hello");
    }
</script>
```

这样，程序被分成了两段，浏览器在解析文档流时，如果遇到第一个`script`标签，则JavaScript解释器会等到这个代码块都加载完后，先对代码块进行预编译，然后再执行。执行完毕后，浏览器会继续解析下面的HTML文档流，同时JavaScript解释器也准备好处理下一个代码块。

由于JavaScript是按块执行的，所以如果在一个JavaScript块中调用后面块中声明的变量或函数就会提示语法错误，例如，当JavaScript解释器执行下面代码时就会提示语法错误，显示hello未定义。
```
<script>
    hello()
</script>

<script>
    function hello() {
        alert("Hello");
    }
</script>
```

虽然说，JavaScript是按块执行的，但是不同块都属于同一个全局作用域，也就是说，块之间的变量和函数是可以共享的
>在实际项目中，往往需要通过src属性引入多个类库来协同使用，这时候要严格区分各个类库的前后引入顺序

### 借助事件机制改变JavaScript执行顺序
由于JavaScript是按块处理代码，同时又遵循HTML文档流的解析顺序，所以在上面示例中会看到这样的语法错误。但是当文档流加载完毕，如果再次访问就不会出现这样的错误。例如，把访问第2块代码中的变量和函数的代码放在页面初始化事件函数中，就不会出现语法错误了。
```
<script>
    window.onload = function () {
        hello()
    }
</script>

<script>
    function hello() {
        alert("Hello");
    }
</script>

```

为了安全起见，我们一般在页面初始化完毕之后才允许JavaScript代码执行，这样可以避免网速对JavaScript执行的影响，同时也避开了HTML文档流对于JavaScript执行的限制。

同时还有注意，如果在一个页面中存在多个windows.onload事件处理函数，则只有最后一个才是有效的，为了解决这个问题，可以把所有脚本或调用函数都放在同一个onload事件处理函数中，例如：


```
window.onload = function(){
    f1();
    f2();
    f3();
}
```

> 最后，如果文章有什么错误和疑问的地方，请指出。与各位共勉！
