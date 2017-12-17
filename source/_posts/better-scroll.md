---
title: Vue中better-scroll插件的使用
date: 2017-12-17 14:01:16
tags: Vue better-scroll
categories: 前端
---
#### 实现原理：父容器固定高度，并设置属性overflow: hidden，使得子元素高度超出容器后能被隐藏。better-scroll作用在父容器上。

1. npm安装better-scroll插件。npm install--save better-scroll
2. 在文件中引入better-scroll。import BScroll from 'better-scroll';

#### 用法：

new BScroll(Dom对象,{//opsitons});
在Vue中要获得Dom对象，需设置标签属性‘v-el’。
例如：<div v-el:betterscroll></div>
获取dom对象，this.$els.betterscroll
为了让子元素能被点击，需设置click:true.并可接受此点击事件@click="info($index,$event)"

```javascript
// 将scroll复制给当前对象的变量betterscroll
this.betterscroll=new BScroll(this.$els.betterscroll,{
  //点击事件许可
  click:true,
})

```
注意：Vue中数据更新是异步的，在数据还没有加载完之前，BScroll是无法获取目标内容容器的高度的，就会出现无法滚动的现象。
这里可以用$nextTick()解决。
vue官方是这样说明的

```javascript
//修改数据
vm.msg='hello'
Vue.nextTick(function () {
  //DOM更新了  
})

```
nextTick应该被用在某些计算属性或者watch再或者某个按钮click事件绑定的methods当中。这时，nextTick才能保证你的数据更新完成之后再执行你绑定的函数。
实例用法：

```javascript
this.$nextTick(()=>{
  this.initscroll();
})
```
注意：在PC上，点击事件会执行两次。由于better-scroll派发的事件有event_constructed:true属性。可以进行处理。
```javascript
info(index,event){
  if (!event.event_constructed) {
    return;    
  };
  console.log(index,event,timeStamp);
}
```
