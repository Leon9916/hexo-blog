---
title: 卡片翻动效果
recommend: 401
toc: true
keywords: categories-web
thumbnail: 'https://cdn-us.imgs.moe/2023/06/24/649600eb806c3.png'
tags: 前端
categories:
  - 前端
  - CSS
abbrlink: 811c040
---

### 背景
卡片翻转效果是一种常见的页面交互效果，可以在用户与网页上的卡片进行交互时增加视觉吸引力和动态效果。通过鼠标悬停、点击或其他触发方式，卡片可以从正面翻转到背面（或者相反），展示另一面的内容。

<!-- more -->

### 倒计时卡片
![](https://cdn-us.imgs.moe/2023/06/24/6495fdcf678e0.gif)
倒计时在前端实现起来还是比较简单，关键是这个卡片是如何翻动的呢，这篇文章主要就是搞定卡片翻动效果，这个效果还是蛮常见的。

### 开始

#### 定义一个容器

首先需要定义容器，这个中间的横线我这里是用的伪元素, 这个无所谓
![](https://cdn-us.imgs.moe/2023/06/24/649603b04afb2.png)

```html
<div class="card-container"></div>
```

```css
body{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 100vh;
        background-color: #353535;
        padding-top: 100px;
        font-size: 4rem;
        color: #333;
        font-family: 'Avenir', sans-serif;
        text-align: center;
    }
    .card-container{
        background-color: #d7d7d7;
        width: 100px;
        height: 100px;
        position: relative;
        perspective: 500px;
    }
    .card-container::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        height: 2px;
        background: linear-gradient(to bottom, #000, #000 1px, #fff 1px);
        width: 100%;
        margin-top: -1px;
        z-index: 99;
    }
```

#### 翻动效果

这里我首先想到的是transform,但是transform是矩阵的线性变换，他是无法完成这个对折的效果的，那又怎么办呢？

这个时候就需要将这卡片裁开，这以2->3为例，就需要定义4个元素了。

我们这时就需要在容器里定义四个元素
```html
<div class="card-container">
    <div class="card1 card">2</div>
</div>
```

```css
/*...上面的省略*/
.card{
    position: absolute;
    width: 100%;
    height: 50%;
    left: 0;
    top: 0;
    overflow: hidden;
}

.card1{
    background-color: red;
    line-height: 100px;
}
```

#### 第一张卡片

我们首先先定义一个元素看看效果
![](https://cdn-us.imgs.moe/2023/06/24/6496080fbf8a7.png)
这样第一张卡片就完成了，接下来设置第二张卡片

第二张卡片显而易见就是下半部分的2了
```html
<div class="card-container">
    <div class="card1 card">2</div>
    <div class="card2 card">2</div>
</div>
```
```css
.card2{
    background-color: green;
    /* 设置行高为0是为了将2的下半部分显示上去 */
    line-height: 0px; 
    top: 50%;

}
```
![](https://cdn-us.imgs.moe/2023/06/24/64960bcea8d5c.png)
上下半部分都画出来了，因为翻转都是下半部分的卡片往上翻，上半部分的往下翻，第一张不需要，这时就要给下半部分的卡片设置动画了

#### 第二张卡片

这里需要注意transform需要设置**torateX**而不是torate或torateY，要不然旋转的方向不对，一个会时钟旋转，一个是沿着Y轴旋转了
而且默认是沿着四角交点旋转为中心，所以还需要设置origin为顶部中点**center top**

![](https://cdn-us.imgs.moe/2023/06/24/64960cacc2440.gif)

```css
 .card2{
    background-color: green;
    /* 设置行高为0是为了将2的下半部分显示上去 */
    line-height: 0px; 
    top: 50%;
    transform: rotateX(180deg);
    /* 这是旋转中心点为分割线，要不然默认是对角中心点 */
    transform-origin: center top;
    /* 设置翻转背面不可见 */
    backface-visibility: hidden;
    transition: 0.5s;
    z-index: 10;
}
/* 设置hover方便调试 */
.card-container:hover .card2 {
    transform: rotateX(0deg);
}
```

#### 第三张卡片
第三张卡片是和第二张卡片一起翻动的，基本样式和第一张一样，动画和第二张差不多，区别在于旋转中心在中下

```html
<div class="card-container">
    <div class="card1 card">2</div>
    <div class="card2 card">2</div>
    <div class="card3 card">3</div>
</div>
```

```css
.card3 {
    background-color: orange;
    line-height: 100px;
    /* 这是旋转中心点为分割线，要不然默认是对角中心点 */
    transform-origin: center bottom;
    /* 设置翻转背面不可见 */
    backface-visibility: hidden;
    transition: 0.5s;
    z-index: 10;
}

/* 设置hover方便调试 */
.card-container:hover .card3 {
    transform: rotateX(-180deg);
}
```
看看效果
![](https://cdn-us.imgs.moe/2023/06/24/649611f6c5f56.gif)

#### 第四张卡片

第四张样式和第二张差不多，只是它不会翻动

```html
<div class="card-container">
    <div class="card1 card">2</div>
    <div class="card2 card">2</div>
    <div class="card3 card">3</div>
    <div class="card4 card">3</div>
</div>
```
```css
.card4{
    background-color: purple;
    /* 设置行高为0是为了将2的下半部分显示上去 */
    line-height: 0px;
    top: 50%;
}
```
看看效果
![](https://cdn-us.imgs.moe/2023/06/24/6496132d84dc4.gif)
这下这个倒计时动画就完成，剩余的js只用到时候替换数字就可以了

#### 完整代码

```html
<body>
    <div class="card-container">
        <div class="card1 card">2</div>
        <div class="card2 card">2</div>
        <div class="card3 card">3</div>
        <div class="card4 card">3</div>
    </div>
</body>
<style>
    body {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 100vh;
        background-color: #353535;
        padding-top: 100px;
        font-size: 4rem;
        color: #333;
        font-family: 'Avenir', sans-serif;
        text-align: center;
    }

    .card-container {
        background-color: #d7d7d7;
        width: 100px;
        height: 100px;
        position: relative;
        perspective: 500px;
    }

    .card-container::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        height: 2px;
        background: linear-gradient(to bottom, #000, #000 1px, #fff 1px);
        width: 100%;
        margin-top: -1px;
        z-index: 99;
    }

    .card {
        position: absolute;
        width: 100%;
        height: 50%;
        left: 0;
        top: 0;
        overflow: hidden;
    }

    .card1 {
        background-color: red;
        line-height: 100px;
    }

    .card2 {
        background-color: green;
        /* 设置行高为0是为了将2的下半部分显示上去 */
        line-height: 0px;
        top: 50%;
        transform: rotateX(180deg);
        /* 这是旋转中心点为分割线，要不然默认是对角中心点 */
        transform-origin: center top;
        /* 设置翻转背面不可见 */
        backface-visibility: hidden;
        transition: 0.5s;
        z-index: 10;
    }

    .card-container:hover .card2 {
        transform: rotateX(0deg);
    }

    .card3 {
        background-color: orange;
        line-height: 100px;
        /* 这是旋转中心点为分割线，要不然默认是对角中心点 */
        transform-origin: center bottom;
        /* 设置翻转背面不可见 */
        backface-visibility: hidden;
        transition: 0.5s;
        z-index: 10;
    }

    /* 设置hover方便调试 */
    .card-container:hover .card3 {
        transform: rotateX(-180deg);
    }

    .card4{
        background-color: purple;
        /* 设置行高为0是为了将2的下半部分显示上去 */
        line-height: 0px;
        top: 50%;
    }
</style>
```

### 总结
这个效果看着挺简单的，关键在于有没有想到将二个数字拆分成4块。









