# throttle-debounce-directive

throttle and debounce directive of Vue 

## install 
```
npm install throttle-debounce-directive -S
```
## usage
### debounce
``` js
import { debounce } from 'throttle-debounce-directive'

const fn = debounce(function () {
  console.log(1)
}, 100, true)
fn() // 立即执行一次
fn() // 不执行
fn() // 不执行
fn() // 不执行
setTimeout(() => {
  fn() // 执行
}, 100)

const fn1 = debounce(function () {
  console.log(2)
}, 100, false)

fn1() //cancle 不执行
fn1.cancel() // cancle 
```

### throttle
```js
import { throttle } from 'throttle-debounce-directive'

const fn = throttle(function () {
  console.log(1)
}, 300, { leading: true, trailing: false })

fn.cancel() // 取消执行
```

### Vdebounce
```js
import Vue from 'vue'
import { Vdebounce } from 'throttle-debounce-directive'
Vue.use(Vdebounce)
```
```html
<div v-debounce="increment"></div> <!-- 默认 click 事件 默认 尾部执行  -->

<div v-debounce="()=>{ increment(1,2) }"></div> <!-- 传递参数 -->

<div v-debounce.immediate="increment"></div> <!-- 立即执行（放在首部执行） -->

<div v-debounce="{cb:()=>{ increment(1,2) },wait:100}"></div> <!-- 更改 wait 时间 默认 wait 300ms -->

<div v-debounce:scroll.immediate="{cb:increment,wait:100}"></div> <!-- 更改触发事件类型 -->

```

### Vthrottle
```js
import Vue from 'vue'
import { Vthrottle } from 'throttle-debounce-directive'
Vue.use(Vthrottle)
```

```html
<div v-throttle="increment">你好</div> <!-- 默认 click 事件 默认首部 尾部都会触发 -->

<div v-throttle="()=>{ increment(1,2) }"></div> <!-- 传递参数 -->

<div v-throttle="{cb:increment,leading:false}"></div> <!-- 更改首部不执行 -->

<div v-throttle="{cb:()=>{ increment(1,2) },leading:false,wait:100}">你好</div> <!-- 更改节流时间 -->

<div v-throttle:scroll="{cb:()=>{ increment(1,2) },wait:100,trailing:false}"></div> <!-- 尾部不执行 -->

<div v-throttle:scroll="{cb:()=>{ increment(1,2) },leading:false,wait:100}"></div> <!-- 更改绑定事件类型 -->

```

## API
### debounce(cb,wait,immediate)
* cb `Function` 必传选项 需要防抖的函数
* wait `Number` 防抖的 时间 默认 300ms
* immediate `Boolean` 是否立即执行(放在首部执行) 默认 `false`(尾部执行)

### throttle(cb,wait,options)
* cb `Function` 必传选项 需要节流的函数
* wait `Number` 节流时间（多久触发一次） 默认 300ms
* options `Object`  默认`{leading: true,trailing: true}` 首部尾部都执行 





