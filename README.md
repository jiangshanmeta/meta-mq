# meta-mq

这个vue插件是为了获取响应式信息进行响应式布局

## 配置参数

#### breakpoints

响应式的分割点，默认是bootstrap的配置：

```javascript
{
    xs:768,
    sm:992,
    md:1200,
    lg:Infinity,
}
```

小于768px为xs，大于等于768px 小于992px为sm，大于等于992px 小于1200px为md，大于等于1200px为lg

#### tag

mq-layout组件用到的，mq-layout组件渲染成的元素，默认为div

## 全局属性 $mq

在每一个vue实例上可以通过 $mq 访问到当前尺寸描述，比如 xs md，而且这个值是响应式的，随着屏幕尺寸的变化自动更新

## 全局组件 mq-layout

这个组件实现了类似于bootstrap的响应式工具类 visible-xs visible-sm

参数：

* visible

字符串或者数组，在哪个尺寸下可以展示slot中的内容 例如 ```xs``` 以及 ```['sm']```

* plus

布尔属性，默认为false，它的作用是辅助visible属性。比如我们希望 sm md lg 三个尺寸下都显示，写成```['sm','md','lg']``` 的形式过于繁琐，可以对visible属性设为sm 然后plus属性为true，这样md lg会被自动添加进去

* miuns

类似于plus，但是作用效果相反，更小的尺寸会被添加进去

* tag

mq-layout要渲染成的元素，可以在注册插件的时候设置默认值

* slim

如果my-layout只有一个直接子元素，并且不需要mq-layout渲染一层包裹元素，可以把这个属性置为true

例如：

```html
<mq-layout visible="sm" minus  slim>
    <p class="demo-paragraph">this paragraph only shows on sm and xs</p>
</mq-layout>
```

会被渲染成

```html
<p class="demo-paragraph">this paragraph only shows on sm and xs</p>
```

并且只在xs和sm下被渲染


## 通途

#### 针对不同屏幕决定是否展示

例如：

```html
<div v-if="$mq === 'sm'">
    content only shows on sm
</div>
```

#### 针对不同屏幕添加类名

例如：

```
<div :class="$mq">
    别学化学
</div>
```

这样写CSS的时候只要关心类名就好了，不用去折腾@media之类的


#### 针对不同屏幕加载不同的组件

异步加载组件可以参考我在[基于vue的通用管理系统中的实现](https://github.com/jiangshanmeta/vue-admin/blob/master/src/mixins/common/dynamicImportComponent.js)